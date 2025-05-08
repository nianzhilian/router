export async function getStudents(page = 1,size = 10){
    return await fetch(`/api/movies?page=${page}&size=${size}`).then((response)=>response.json()).then((res)=>res.data);
}