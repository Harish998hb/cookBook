import { useUserStore } from '../stores/userStore'

const userStore=useUserStore();

export async function likeNotify(userId,reciepeId){
    const savedReciepesIds=await userStore.fetchSavedDishes(userId);
    console.log(savedReciepesIds);
    
}