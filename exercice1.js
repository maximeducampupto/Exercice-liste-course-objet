/**
 * Created by sstienface on 16/10/2018.
 */

function log(what)
{
    console.log(what);
}

var liste = {

    articles : [
        "Orangina",
        "Creme Fraiche",
        "Tartiflette",
        "Emmental",
        "Bananes",
        "Chips",
        "Bieres",
        "Pizza"
    ],

    renduHTML : document.getElementById('listeCourse'),
    user_input : null,
    last_used_id : 0,

    display: function()
    {
        this.articles.map(function(article)
      {
          liste.createListItem(article, liste.last_used_id);
      });
    },

    createListItem: function(article, id)
    {
        if (!article)
        {
            return;
        }

        var li = document.createElement('li'),
            button_hide = document.createElement('button'),
            button_delete = document.createElement('button');

        li.innerHTML = article;
        li.id = "li-" + id;

        button_delete.innerHTML = "Supprimer";
        button_delete.classList.add('delete-button');

        button_hide.innerHTML = "Masquer";
        button_hide.classList.add('hide-button');


        li.appendChild(button_delete);
        li.appendChild(button_hide);

        this.renduHTML.appendChild(li);
        liste.last_used_id++;
    },

    addUserArticle: function()
    {
        this.user_input = document.getElementById('user-input').value;

        if (this.user_input.length > 0)
        {
            this.createListItem(this.user_input, this.last_used_id);
            document.getElementById('user-input').value = '';
        }
    },

    removeListItem: function(which)
    {
        if (!this.renduHTML.hasChildNodes()) {
            return;
        }

        if (which == 'last' )
        {
            this.renduHTML.removeChild(this.renduHTML.lastChild);
            return;
        }

        this.renduHTML.removeChild(which);
    },

    hideListItem: function(which)
    {
        // TODO : A refaire entièrement (avec des animations) ?

        which.style.visibility = 'hidden';

        for (var button of which.children)
        {
            button.style.visibility = 'visible';
        }
    }
};

liste.display();

document.addEventListener('click', function(e)
{
    var t = e.target;

    if (t.tagName !== 'BUTTON') {
        e.preventDefault();
        return;
    }

    switch(t.id)
    {
        case "button-add":
            liste.addUserArticle();
            break;
        case "button-delete-last":
            liste.removeListItem("last");
            break;
        default:
            if (t.classList.contains('hide-button')) {
                liste.hideListItem(t.parentNode);
            } else if (t.classList.contains('delete-button')) {
                liste.removeListItem(t.parentNode);
            }
    }

});