/**
 * Created by valeriy.abornyev on 12/23/2015.
 */

function checkSuggestionOnCanvas() {
    for(var key in nodes._data) {
        if(nodes._data[key].group == 'suggestion' ) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports =  checkSuggestionOnCanvas;