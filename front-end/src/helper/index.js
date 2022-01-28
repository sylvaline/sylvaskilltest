
export default class Helper{
    
    checkPrediction(){
        const hypothesis = localStorage.getItem("hypothesis").toLocaleLowerCase()
        
        // checking if the hypothesis contains water
        if (hypothesis.length > 0){
            const word_list = hypothesis.split(" ")
            console.log(word_list)
            let is_water = word_list.includes("water")
            console.log("is water "+is_water)
            if (is_water){
                return true
            }
        }
        return false
    }
}