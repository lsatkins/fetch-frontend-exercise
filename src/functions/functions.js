
export const checkBreeds = (input, array) => {

    for(let breed in array){
        if(breed.contains(input)){
            return breed
        }
    }

}