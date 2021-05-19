<script>
import axios from 'axios'

function getToken(name){
    const tokens = JSON.parse(localStorage.getItem('materialsUserInfo'));
      console.log("token",tokens)
    if(tokens){
        return tokens.token;
    }else{
        return null
    }
}

function getUserId (name){
    const tokens = JSON.parse(localStorage.getItem('materialsUserInfo'));
    //   console.log("token",tokens.id)
    if(tokens){
        return tokens.id;
    }else{
        return 0
    }
}
export default{
    getToken,
    getUserId,
}
</script>


