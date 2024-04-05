const Base_URL = 'https://notes-api.dicoding.dev/v2'

class NotesApi {
    // show list data notes
    static getNotes() {
        return fetch(`${Base_URL}/notes`)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json()
                } else {
                    return Promise.reject(new Error(`Terjadi kesalahan`))
                }
            })
            .then((result) => {
                const data = result.data
                console.log(data)
                if (data.length > 0) {
                    return Promise.resolve(data)
                } else {
                    return Promise.reject(
                        new Error(`Tidak ada note data yang tersedia`)
                    )
                }
            })
    }

    // add note
    static createNotes(title, body) {
        const data = new URLSearchParams()
        data.append('title', title)
        data.append('body', body)

        return fetch(`${Base_URL}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data,
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json()
                } else {
                    throw new Error(`Gagal membuat note`)
                }
            })
            .then((result) => result.data)
            .catch((error) => {
                console.error(error)
                throw error
            })
    }

    // delete note
    static deleteNotes(noteId) {
        return fetch(`${Base_URL}/notes/${noteId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json()
                } else {
                    throw new Error(`Gagal menghapus note`)
                }
            })
            .then((result) => {
                console.log('Note berhasil dihapus', result)
                return result
            })
            .catch((error) => {
                console.error(error)
                throw error
            })
    }
}

export default NotesApi
