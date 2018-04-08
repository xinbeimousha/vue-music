import * as types from './mutation-types';
import {playMode} from 'common/js/config';
import {shuffe} from 'common/js/util';
function findIndex(list,song){
    return  list.findIndex((item) => {
        return item.id===song.id
    })
}
export const selectPlay = function({commit,state},{list,index}){
    commit(types.SET_PLAYING,true);
    commit(types.SET_FULL_SCREEN,true);
    commit(types.SET_SEQUENCE_LIST,list);
    if(state.mode===playMode.random){
        let randomList = shuffe(list)
        commit(types.SET_PLAY_LIST,randomList);
        index = findIndex(randomList,list[index])
    }else{
        commit(types.SET_PLAY_LIST,list);
    }
    
    commit(types.SET_CURRENT_INDEX,index);
}

export const randomPlay =function({commit},{list}){
    commit(types.SET_PLAY_MODE,playMode.random);
    commit(types.SET_SEQUENCE_LIST,list);
    let randomList = shuffe(list);
    commit(types.SET_PLAY_LIST,randomList);
    commit(types.SET_CURRENT_INDEX,0);
    commit(types.SET_PLAYING,true);
    commit(types.SET_FULL_SCREEN,true);
}