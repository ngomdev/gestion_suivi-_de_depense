// creation de l'objet 


let etat = {

    balance: 0,
    revenu : 0,
    depense: 0,
    // création du tableaux transaction qui contient aussi des objets
    transactions: []
    
};
  

// Acces et initialisation aux elements

let balanceEl = document.querySelector('#balance');
let revenusEl = document.querySelector('#revenus');
let depenseEl = document.querySelector('#depenses');
let transactionsEl = document.querySelector('#transaction');
let revenuBtnEl = document.querySelector('#revenu-btn');
let depenseBtnEl = document.querySelector('#depense-btn');
let nameInpuEl = document.querySelector('#name');
let montantInputEl = document.querySelector('#montant');

// fonction générale du contenu
function init(){
    let localState = JSON.parse(localStorage.getItem('EtatSuiviDepense'));
    if(localState!== null){
        etat = localState;

    }
    updateEtat();
   
    initlisteners();


}
// Générer des id automatiques pour les transactions 
function uniqueId(){
    return Math.round(Math.random() * 100000);
}
//fonction pour écouter les évenements boutons ajouter revenus/ ajouter depenses
function initlisteners(){
    revenuBtnEl.addEventListener('click', onAddRevenuClick);
    depenseBtnEl.addEventListener('click', onAddDepenseClick);

}
// fonction générale pour insérer des transactions revenu/dépenses
function addTransaction(name, montant, type){

    if(name!== '' && montant!== ''){
        let transaction = {
            id: uniqueId(),
            name: name, 
            montant: parseInt(montant),
            type: type
        };
        // ajout d'un autre element dans le tableau transaction
       etat.transactions.push(transaction);
      
    
      
       updateEtat();

    }else{
        alert('SVP! Entrer une valeur correcte');
    }

    nameInpuEl.value ='';
    montantInputEl.value = '';


}

// fonction rendu du bouton ajouter revenu quand on clique dessus

function onAddRevenuClick(){
    addTransaction(nameInpuEl.value, montantInputEl.value,'revenu');
    
}


// fonction rendu du bouton ajouter dépense quand on clique dessus
function onAddDepenseClick(){
    addTransaction(nameInpuEl.value, montantInputEl.value, 'depense');
}

//fonction pour modifier un élément


// fonction pour supprimer un élément 

function onDeleteClick(event){
  
    let id = parseInt(event.target.getAttribute('data-id'));

    let deleteIndex;
    for(let i = 0 ; i < etat.transactions.length ; i++){
       if(etat.transactions[i].id === id){
          deleteIndex = i;
          break;
       }
     
    }
     etat.transactions.splice(deleteIndex, 1);
     updateEtat();
}


//  fonction pour modifier les etats
function updateEtat(){

    let balance = 0,
        revenu = 0,
        depense = 0,
        items;
    for(let i = 0; i < etat.transactions.length ; i++){

        items = etat.transactions[i];
        if(items.type === 'revenu'){
            revenu += items.montant;
        }else if(items.type === 'depense'){
            depense += items.montant
        }
    }
    balance = revenu - depense ;
    etat.balance = balance;
    etat.revenu = revenu;
    etat.depense = depense;
// sauvegarder les donnees dans le local Storage
localStorage.setItem('EtatSuiviDepense', JSON.stringify(etat));


    //  A La sorti du boucle retour des etats
    rendu();
}

function rendu(){
    balanceEl.innerHTML = `${etat.balance} FCFA`;
    revenusEl.innerHTML = `${etat.revenu} FCFA`;
    depenseEl.innerHTML = `${etat.depense} FCFA`;
  
   let transactionEl ,containerEl , montantEl ,items , btnEl , iconEl ,btnEl1,iconEl1;
   transactionsEl.innerHTML = '';
  
  // Parocurir le tableaux transactions pour creer les elements 
  
    for(let i = 0 ; i < etat.transactions.length ; i++){
      items = etat.transactions[i];
  
      transactionEl = document.createElement('li');
      transactionEl.append(items.name);
  
      transactionsEl.appendChild(transactionEl);
  
      containerEl = document.createElement('div');
      montantEl = document.createElement('span');
     
      if(items.type === 'revenu'){
          montantEl.classList.add('revenu-el');
  
      }else if (items.type === 'depense'){
          montantEl.classList.add('depense-el');
  
      }
  
      montantEl.innerHTML =`${items.montant} FCFA`;
  
      
      containerEl.appendChild(montantEl);
      transactionEl.appendChild(containerEl);
      
      // creation du premier bouton
  
      btnEl = document.createElement('button');
     
      iconEl = document.createElement('i');
      
      iconEl.classList.add('fa-solid','fa-pen-to-square');
   
      btnEl.appendChild(iconEl);

   
    
      containerEl.appendChild(btnEl);
  
      // creation du deuxieme bouton
      btnEl1 = document.createElement('button');
      // target pour la suppression d'un element du tableau
    

      iconEl1 = document.createElement('i');
      btnEl1.setAttribute('data-id', items.id);

      
      iconEl1.classList.add('fa-solid','fa-trash-can');
   
      btnEl1.appendChild(iconEl1);
      
      btnEl1.addEventListener('click', onDeleteClick);
    
      containerEl.appendChild(btnEl1);


  
    }
  
     
    
}

init();

















