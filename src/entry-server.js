import {createApp} from './createapp'
export default context=>{
    return new Promise((resolve,reject)=>{
        const {app,router}=createApp(context)
        router.push(context.url)
        router.onReady(()=>{
            resolve(app)
        },reject)
    })
}