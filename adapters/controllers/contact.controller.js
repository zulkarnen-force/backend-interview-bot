import MakeContactUseCase from "../../application/use_cases/contact/MakeContactUseCase.js"
import fs from "fs"
import parse from 'csv-parser';
import Contact from "../../frameworks/database/mongoDB/model/Contact.js";
import path from "path";


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
                data: response
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

        const jsonDirectory = path.join(process.cwd(), 'uploads');
        // const readable = Readable.from(req.file.buffer);
        // console.log(readable)
        // readable.on('data', (r) => {
        //     // console.log(r);
        //     // let f = fs.readFileSync(r);
        //     // console.log(f);
        //     // return;
        //     console.log(String(r))
        //     fs.createReadStream(String(r))

        // })
        // return;
        try {
            let data = [];
            let fileDir = `${jsonDirectory}\\${req.file.filename}`;
            fs.createReadStream(fileDir)
            .pipe(parse({ delimiter: ',' }))
            .on('data', (r) => {
                let telp = r['Phone 1 - Value'].replace(' ', '').split(':::')[0];
                if (r.Name === '' || telp === '') {
                    return;
                }
                data.push({name: r.Name, telephone: r['Phone 1 - Value'].replace(' ', '').split(':::')[0],  channel: 'whatsapp'})
            })
            .on('end', () => {
                console.log(data.length)
                console.log(data)
                Contact.insertMany(data, {ordered: false}).then(result => {
                    return res.json(result)
                }).catch(err => {
                    console.log(err);
                    return res.status(400).json({
                        code: err.code,
                        message: err.message
                    })
                })
            })
            
        } catch (error) {
            return res.status(400).json( {
               message: error.message
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