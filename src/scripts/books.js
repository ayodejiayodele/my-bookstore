//Function to get bestseller books from amazon.com
function getBestsellerBooks() {
    var url = "https://www.amazon.com/gp/bestsellers/books/ref=zg_bs_nav_0";
    var books = [];
    var book = {};
    //var response to get the html content of the url using xmlHttp
    var ajax = XmlHttp.create();
    ajax.open("GET", url);
    ajax.send();
    var response = ajax.getResponseText();
    var html = response;
    //get all div elements with class zg_itemImm from the html content
    var bookList = html.match(/<div class="zg_itemImm">[\s\S]*?<\/div>/g);
    var books = [];
    var book = {};
    //loop through the bookList to get the book details
    for (var i = 0; i < bookList.length; i++) {
        //get the book title
        book.title = bookList[i].match(/<div class="p13n-sc-truncate p13n-sc-line-clamp-1" dir="auto">[\s\S]*?<\/div>/g)[0].replace(/<div class="p13n-sc-truncate p13n-sc-line-clamp-1" dir="auto">/g, "").replace(/<\/div>/g, "");
        //get the book author
        book.author = bookList[i].match(/<div class="a-row a-size-small">[\s\S]*?<\/div>/g)[0].replace(/<div class="a-row a-size-small">/g, "").replace(/<\/div>/g, "");
        //get the book image
        book.image = bookList[i].match(/<img src="[\s\S]*?"/g)[0].replace(/<img src="/g, "").replace(/"/g, "");
        //get the book price
        book.price = bookList[i].match(/<span class="p13n-sc-price">[\s\S]*?<\/span>/g)[0].replace(/<span class="p13n-sc-price">/g, "").replace(/<\/span>/g, "");
        //get the book rating
        book.rating = bookList[i].match(/<span class="a-icon-alt">[\s\S]*?<\/span>/g)[0].replace(/<span class="a-icon-alt">/g, "").replace(/<\/span>/g, "");
        //get the book url
        book.url = bookList[i].match(/<a href="[\s\S]*?"/g)[0].replace(/<a href="/g, "").replace(/"/g, "");
        //add the book to the books array
        books.push(book);
        //reset the book object
        book = {};
    }

    return books;
}