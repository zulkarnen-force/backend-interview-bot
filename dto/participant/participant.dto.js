const example_data = [
    { "_id": "64156da04f7ef456b94a8e11", "name": "Zulkarnen",
    "hobby": "Membaca",
    "wake_up_time": "07:00",
    "user_id": 692704296,
    "history": "undefined helo Halo, selamat datang! Saya ingin mengumpulkan data pengguna untuk penelitian. Apakah Anda berminat untuk berpartisipasi?. boleh Terima kasih sudah bersedia berpartisipasi. Pertama-tama, boleh saya tahu nama Anda?. Zulkarnen Terima kasih, nama Anda adalah Zulkarnen. Apa hobi yang Anda gemari, Zulkarnen?. Membaca Bagus! Saya suka membaca juga. Apa jenis buku yang biasa Anda baca?. Dan kapan biasanya Anda bangun tidur di pagi hari?.. Jam 07",
    "created_at": "2023-03-18T07:52:00.150Z",
    "__v": 0
    },
    {
    "_id": "6415702a1a59462903b8b022",
    "name": "Zulkarnen",
    "hobby": "membaca",
    "wake_up_time": "08:00",
    "user_id": 692704296,
    "history": "undefined Halo Selamat datang! Terima kasih sudah bersedia untuk diwawancarai. Boleh saya tahu nama Anda?. Zulkarnen Baik, terima kasih Zulkarnen. Boleh saya tahu hobi yang Anda gemari?. Hobi ku membaca Bagus sekali! Apa jenis buku yang biasa Anda baca?. computer Oke, jadi Anda senang membaca buku tentang komputer ya. Berapa jam biasanya Anda tidur malam? Jangan lupa sertakan juga waktu bangunnya ya.. malam jam 8 pagi jam 8",
    "created_at": "2023-03-18T08:02:50.174Z",
    "__v": 0
    }
]
const getAllDto = (datas = []) => {
    return datas.map( (value) => {
        let response = {};
        response['data'] = {
            hobby: value.hobby,
            name: value.name,
            user_id: value.user_id,
            wake_up_time: value.wake_up_time
        };
        response.history = value.history;
        response.channel = 'telegram';
        response.status = 'complete';
        response.crated_at= value.created_at;
        return response;
    })
    
} 

export default getAllDto;