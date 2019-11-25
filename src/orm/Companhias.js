let cmps = [{
        id: 1,
        nome: 'Apple',
        segmento: 'Tech'
    },
    {
        id: 2,
        nome: 'Malboro',
        segmento: 'Cigarros'
    }
]

module.exports = {
    findAll() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(cmps)
            }, 2500)
        })
    },
    find(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(cmps.find(c => c.id == id))
            }, 1000)
        })
    }
}