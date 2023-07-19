State = {
    id:String,
    sigla:String,
    nome:String,
    regiao:{
        id:Number,
        nome:String,
        sigla:String
    },
    sigla:String,
}
previousIndex=0
previousIndexCounty=0
states :State = []
optionsState={}
url="https://servicodados.ibge.gov.br/api/v1/localidades/estados"
fetch(url)  
.then((resp) => resp.json())
.then(function(data) {
    var selectCounty = document.getElementById("counties");
    selectCounty.add(new Option(text="Selecione uma cidade",value=""))
  states=data;
  console.log(states);
  var selectState = document.getElementById("states").options;
  console.log(selectState);
  //console.log(states.map(({nome,id})=>({nome,id})).sort((a,b) => (a.nome > b.nome) ? 1:-1));
  //optionStates={nomes:states.map((st => nome=st.nome)), ids:states.map((st => nome=st.id))}
  //console.log(states.map((st => nome=st.nome)));
  //optionsStates = states.map((st => st.nome).sort());
  optionsStates=states.map(({nome,id})=>({nome,id})).sort((a,b) => (a.nome > b.nome) ? 1:-1)
  console.log(optionsStates);
  selectState.add(new Option(text="Selecione um estado",value=""))
  optionsStates.forEach(element => {
    selectState.add(new Option(text=element.nome,value=element.id));
  });

})
.catch(function(error) {
  console.log(error);
});


function getCities(){
    var selectState = document.getElementById("states");
    console.log(selectState.selectedIndex);
    if(selectState.selectedIndex!=0){
        console.log(optionsStates[selectState.selectedIndex-1].id)
        url=`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${optionsStates[selectState.selectedIndex-1].id}/municipios`;
        console.log(url);
        fetch(url)  
            .then((resp) => resp.json())
            .then(function(data) {
            console.log(data);
            var selectCounty = document.getElementById("counties");
            //console.log(document.getElementById("counties").options);
            //collection.clear()
            //if(previousIndex!=0)
                //selectCounty.forEach(element=>{selectCounty.remove(element.index)});
            console.log(selectCounty.options.length);
            if(selectCounty.options.length>1)
                for (let i = selectCounty.options.length-1; i>0 ; i--) {
                    selectCounty.options.remove(i);
                }
                //selectCounty=[new Option(text="Selecione uma cidade",value="")]
            counties = data.map(ctn=>ctn.nome);
            /*setTimeout(function () {
                counties.forEach(element=>{
                selectCounty.add(new Option(element));
                    });
                console.log(selectCounty.options.length);

                }, 2000);*/
            counties.forEach(element=>{
                selectCounty.add(new Option(element));
                    });
                console.log(selectCounty.options.length);
    
            previousIndex=selectState.selectedIndex;
            })
            .catch(function(error) {
            console.log(error);
            });
    }
    else{
        var selectCounty = document.getElementById("counties");

        if(selectCounty.options.length>1)
            for (let i = selectCounty.options.length-1; i>0 ; i--) {
                selectCounty.options.remove(i);
            }
    }
}
