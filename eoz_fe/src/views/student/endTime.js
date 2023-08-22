import { reactive } from 'vue'
import router from '../../router';
import VueCookies from 'vue-cookies';
import axios from 'axios';
import { useRoute } from "vue-router";
export const store = reactive({
    EndTime: 1,
    answerJson: {
        _id: '',
        token: VueCookies.get('token'),
        key: [],
    },
    sendAnswer() {
        const userToken = {
            headers: {
                'Authorization': 'Bearer ' + VueCookies.get('token')
            }
        };
        const id = this.answerJson._id;
        axios.post('http://localhost:3000/v1/sendAnswer/' + id, {
            key: this.answerJson.key
        }, userToken)
            .then(res => {
                router.push({
                    name: 'point',
                    params: {
                        id: this.answerJson.id,
                    }
                })
            })
            .catch(error => {
                console.log('Loi server');
            });
    }
})