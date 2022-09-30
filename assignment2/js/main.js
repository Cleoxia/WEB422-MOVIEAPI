let page=1;
let perPage=10;

function loadMovieData(title = null){
    if(title!=null){
        fetch(`https://mushy-seal-stockings.cyclic.app/api/movies?page=${page}&perPage=${perPage}&title=${title}`)
        .then(res => {
            if(res.ok){
               console.log('Success') 
            }
            else{
                console.log('Not Successful')
            }
            res.json()
        })
        .then(movies=>{
            console.log(movies)
            //modal invisible
            let div= document.querySelector(".pagination")
            div.classList.add("d-none")
            //build table template
            let tableBody=`${movies.map((movie)=>{
            `<tr data-id="${movie.id}">
                <td>${movie.year}</td>
                <td>${movie.title}</td>

                ${movie.plot?
                `<td>${movie.plot}</td>`
                :`<td>N/A</td>`}

                ${movie.rated?
                    `<td>${movie.rated}</td>`
                    :`<td>N/A</td>`}

                <td>${Math.floor(movie.runtime).toString}:${(movie.runtime % 60).toString().padStart(2, '0')}</td>
            </tr>`
          }).join('')}`
          //add table to tbody
          document.querySelector('#moviesTable tbody').innerHTML = tableBody;
          //Updating the "Current Page"
          document.querySelector('#current-page').innerHTML = `${page}`;// double ""?
        });
    }
    else{
        fetch(`https://mushy-seal-stockings.cyclic.app/api/movies?page=${page}&perPage=${perPage}`)
        .then(res => {
            if(res.ok){
               console.log('Success') 
            }
            else{
                console.log('Not Successful')
            }
            res.json()
        })
        .then(movies=>{
            console.log(movies)
            //modal visible
            let div= document.querySelector(".pagination")
            div.classList.remove("d-none")
        });
    }
}

//Adding Click Events & Loading / Displaying Movie Data
document.querySelectorAll('#moviesTable tbody tr').forEach((row) => {
    row.addEventListener('click', (e) => {
        let clickedId = row.getAttribute('data-id');
        fetch(`https://mushy-seal-stockings.cyclic.app/api/movies/${clickedId}`)
        .then((res) => res.json())
        .then((movie) => {
            console.log(data);
         });
         let directorString=movie.director.join();
         let castString=movie.cast.join()
         let modalBody=
         `<img class="img-fluid w-100" src="${movie.poster}"><br><br>
          <strong>Directed By:</strong> ${directorString}<br><br>
          <p>${movie.fullplot}</p>
          ${movie.cast?
            `<strong>Cast:</strong> ${castString}<br><br>`
            :`<strong>Cast:</strong> N/A<br><br>`
          }
          <strong>Awards:</strong> ${movie.awards.text}<br>
          <strong>IMDB Rating:</strong> ${movie.imdb.rating} (${movie.imdb.votes} votes)
         `
         document.querySelector('#detailModal h5').innerHTML = `${movie.title}`;
         document.querySelector('#detailModal modal-body').innerHTML = modalBody;
         let myModal = new bootstrap.Modal(document.getElementById('detailModal'), {
            backdrop: 'static', // default true - "static" indicates that clicking on the backdrop will not close the modal window
            keyboard: false, // default true - false indicates that pressing on the "esc" key will not close the modal window
          });
          
          myModal.show();
    })
});


document.querySelector('#previous-page').addEventListener('click', (e) => {
    if (page > 1) {
        page--;
    }
    loadMovieData();
});

document.querySelector('#next-page').addEventListener('click', (e) => {
    page++;
    loadMovieData();
});

document.querySelector('#searchForm').addEventListener('submit', (e) => {
    loadMovieData(e);
});

document.querySelector('#clearForm').addEventListener('reset', (e) => {
    loadMovieData();
});
