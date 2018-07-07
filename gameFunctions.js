// game functions functions

// this file contains many example functions which poll/call updates to the database


module.exports = {
    hello: function(cmds) {
        return 'hello right back to you!';
    },
    
    navigate: function(cmds) {
        return 'I wanna go to: '.concat(cmds);        
    },

    mirror: function(cmds) {
        return 'I am user number: '.concat(cmds);
    },

    huh: function() {
        return 'I am not sure what you mean exactly...';
    }

} 

