(function(i){if(!i)throw Error('Interpol not loaded');var b={},c={},r=i.resolvers().slice(0);r.push({resolveExports:function(n){var m=c[n];if(m){return m;}return c[n]=b[n].exports();},resolveModule:function(n){return b[n];}});var j={"test":{"i":"interpol","v":"0.1.6","l":["html","op","head","title","id","ou","cl","ct"," this is a comment ","body","There are %length stooges","people","fm","renderList","ca","ul","person","brother","brothers","mb","renderItem","name","\n","fr","de","li","%brother is the brother of %name","se","renderTest","Hello %name","im"],"n":[30,[[24,13,[11],[[1,15,[],0],[5,22],[23,[[16,[4,11]],[17,[19,[4,16],18]]],[[5,[14,[4,20],[[19,[4,16],21],[4,17]]]],[5,22]]],[6,15],[5,22]]],[24,20,[21,17],[[1,25,[],0],[5,[12,26,[27]]],[6,25],[5,22]]],[24,28,[21],[[5,[12,29,[27]]],[5,22]]],[1,0,[],0],[5,22],[1,2,[],0],[5,22],[1,3,[],0],[5,[4,3]],[6,3],[5,22],[7,8],[5,22],[6,2],[5,22],[1,9,[],0],[5,22],[5,[12,10,[4,11]]],[5,22],[5,[14,[4,13],[[4,11]]]],[5,22],[6,9],[5,22],[6,0],[5,22]]]}};for(var k in j){b[k]=i(j[k],{resolvers:r});}i.testApp=b;j=null;})(typeof require==='function'?require('interpol'):this.$interpol);