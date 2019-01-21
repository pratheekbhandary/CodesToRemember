function friendsCircle(array){
      const visited=array.map(()=>true);
      const friendsCircle={};
      visited.forEach((isVisited,mySelf)=>{
        if(isVisited){
            findFriends(mySelf,[mySelf]);
        }
    })
    const outputString=Object.values(friendsCircle).reduce((acc,current)=>{
        if(current){
            return acc+current.join()+'|';
        }
        return acc;
    },'');
    return outputString.substring(0,outputString.length-1);
    
function findFriends(mySelf,oldFriendsArray){
    friendsCircle[mySelf]=oldFriendsArray;
    array[mySelf].forEach((isFriend,friendId)=>{
        if(friendId>mySelf){
            if(isFriend){
                if(friendsCircle[friendId]){
                    friendsCircle[friendId]=[...friendsCircle[mySelf],...friendsCircle[friendId]].sort();
                }
                else{
                    findFriends(friendId,[...friendsCircle[mySelf],friendId]);
                }
                friendsCircle[mySelf]=null;
                visited[friendId]=false;
            }
        }
    }); 
}
}