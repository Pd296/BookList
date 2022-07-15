
function Book(name,author,isbn){
this.name=name;
this.author=author;
this.isbn=isbn;
}

function UI(){}


// addBooks
UI.prototype.addBooks=function(book){
    const bookList=document.getElementById('book-list')
    const row=document.createElement('tr');

    
    row.innerHTML=`
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a>`;
    bookList.appendChild(row);
   
}

UI.prototype.deleteRow= function(target){

  if(target.className==='delete'){
    target.parentElement.parentElement.remove();
  }
}

//clear fields

UI.prototype.clearFields=function(){
   document.getElementById('title').value='';
   document.getElementById('author').value='';
   document.getElementById('isbn').value='';
}

//show alert

UI.prototype.showAlert= function(msg,className){
      
    const container=document.querySelector('.container');
    const form=document.getElementById('book-form');
    const div=document.createElement('div');
   
    div.appendChild(document.createTextNode(msg));
    div.className = `alert ${className}`;
    container.insertBefore(div,form);

 setTimeout(() => {
    const element=document.querySelector('.alert');
    element.remove();
 }, 1000)

}
const form=document.getElementById('book-form');

// add Books event listener
form.addEventListener('submit',function(e){
    e.preventDefault();
   const title=document.getElementById('title').value,
        author=document.getElementById('author').value,
        isbn=document.getElementById('isbn').value;

      //Instantiate book  
      const book=new Book(title,author,isbn);


      //Instantiate UI
      const ui = new UI();

      //validate book
      if(book.name==='' || book.author==='' || book.isbn===''){
        ui.showAlert('Enter all fields.','error');
        return;
    }
     

      //Add books to the list
      ui.addBooks(book);
      ui.showAlert("Book added !",'success');

      //clear UI fields
      ui.clearFields();

})


//delete books event listener
const tableBody= document.querySelector('#book-list');
tableBody.addEventListener('click',function(e){
   
  ////Instantiate UI
  const ui = new UI();

  ui.deleteRow(e.target);

  //show alert
  ui.showAlert("Book deleted !",'success');

  e.preventDefault();

})