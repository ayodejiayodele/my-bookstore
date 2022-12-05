//Function to get bestseller books from amazon.com
function getBestsellerBooks() {
    var url = "https://www.amazon.com/gp/bestsellers/books/ref=zg_bs_nav_0";
    var books = [];
    var book = {};
    var response = UrlFetchApp.fetch(url);
    var html = response.getContentText();
    var doc = HtmlService.createHtmlOutput(html);
    var bookList = doc.$x("//div[@class='zg_itemImm");
    for (var i = 0; i < bookList.length; i++) {
        var bookTitle = bookList[i].$x(".//div[@class='p13n-sc-truncate']");
        var bookAuthor = bookList[i].$x(".//div[@class='a-row a-size-small']/a");
        var bookPrice = bookList[i].$x(".//span[@class='p13n-sc-price']");
        book = {
            title: bookTitle[0].getText(),
            author: bookAuthor[0].getText(),
            price: bookPrice[0].getText()
        };
        books.push(book);
    }
    return books;
}