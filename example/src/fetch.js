const invoices = [{id: 1, name: 'invoice1'}, {id: 2, name: 'invoice2'}, {id: 3, name: 'invoice3'}]

export function onRequest(){
  return new Promise(function(resolve, reject){
    setTimeout(resolve, 1000, invoices);
  })
}
