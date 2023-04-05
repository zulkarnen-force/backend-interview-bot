import MakeContactUseCase from "../../application/use_cases/contact/MakeContactUseCase.js"
import fs from "fs"
import parse from 'csv-parser';
import Contact from "../../frameworks/database/mongoDB/model/Contact.js";
import path from "path";
import { Readable } from "stream";
import csvParser from "csv-parser";
import * as CSV from 'csv-string';



export default function makeContactController(repository) {
    let usecase = MakeContactUseCase(repository);
   
    const listOfContact = async (req, res, next) => {
        let contacts = await usecase.listOfContact();
        return res.json({
            message:'list of contacts',
            data: contacts
        });
    }

    const storeContact = async (req, res, next) => {
        try {
            let response = await usecase.storeContact(req.body)
            return await res.json({
                message: 'contact saved successfully',
                data: {
                    id: response._id
                }
            });
        } catch (e) {
            return await res.status(400).json({
                errors: {
                    code: e.code,
                    message: e.message
                }
            });
        }
    }

    
    const getContact = async (req, res, next) => {
        let id = req.params.id;
        try {
            let response = await usecase.getOneContact(id);
            if (!response) {
                throw new Error('contact not found');
            }
            return res.json(response);
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }



    const updateContact = async (req, res, next) => {
        try {
            let response = await usecase.updateContact(req.params.id, req.body);
            return res.json( {
                message: 'update contact successfully',
                response: response
            })
        } catch (error) {
            return res.json( {
               message: error.message
            })
        }
    }


    const deleteContact = async (req, res, next) => {
        try {
            let response = await usecase.deleteContact(req.params.id);
            if (!response) {
                throw new Error('contact not found');
            }
            return res.json( {
                message: 'delete contact successfully',
                respoonse: response
            })
        } catch (error) {
            return res.status(400).json( {
               message: error.message
            })
        }
    }



    const importContacts = async (req, res, next) => {
        try {
            let data = [];
            let t = CSV.parse(String(req.file.buffer), {output: 'objects'} )
            t.forEach(value => {
                let telp = value['Phone 1 - Value'].replace(' ', '').split(':::')[0]
                let name = value['Name']
                if (name === '' || telp === '') return;
                data.push({name: name, telephone: telp,  channel: 'whatsapp'})
             })
             let response = await Contact.insertMany(data, {ordered: false});
             res.json({
                message: 'successfully',
                response: response
             })
        } catch (error) {
            res.json({
                message: 'so sad',
                error: error.message
             })
        }
        
    }

    
    

    return {
        listOfContact,
        storeContact,
        getContact,
        updateContact,
        deleteContact,
        importContacts
    }
} 