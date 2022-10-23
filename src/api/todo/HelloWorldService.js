import axios from "axios"

class HelloWorldService{
    executor(){
        // console.log("Executed service call");
        return axios.get("http://localhost:8082/hello-world")
    }
}

export default new HelloWorldService()