import axios from 'axios'
import showAlert from './alerts'


export const updateData = async(name, email) => {
    try{
        const res = await axios({
            method: 'PATCH',
            url: 'http://localhost:9000/api/v1/users/updateMe',
            data:{
                name, email
            }
        })

        if (res.data.status === 'success'){
            showAlert('success', 'data updated successfully')
        }
    } catch(err) {
        console.log(err)
        showAlert('error', err.response.data.message)
    }
}