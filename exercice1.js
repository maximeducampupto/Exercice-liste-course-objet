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

        var li = listItem.instantiate(article, id);

        this.renduHTML.appendChild(li);
        this.last_used_id++;
    },

    addArticleFromUserInput: function()
    {
        this.user_input = document.getElementById('user-input').value;

        if (this.user_input.length > 0 && this.user_input.length < 20)
        {
            this.createListItem(this.user_input, this.last_used_id);
        }
        else
        // TODO Implementer throwAlert(message, color);
        {
            alert('input trop grand');
        }

        document.getElementById('user-input').value = '';

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

    hideListItem: function(li)
        // TODO : A refaire entièrement (avec des animations) ?
    {
       listItem.hide(li);
    },

    moveItemDown: function(li)
    {
        var nextSibling = li.nextElementSibling;

        if (nextSibling)
        {
            var detached = this.renduHTML.removeChild(nextSibling);
            this.renduHTML.insertBefore(detached, li);
        }
    },

    moveItemUp: function(li)
    {
        var previousSibling = li.previousSibling;

        if (previousSibling)
        {
            var detached = this.renduHTML.removeChild(li);
            this.renduHTML.insertBefore(detached, previousSibling);
        }
    }
};


var listItem = {

    init: function()
    {
        this.li = document.createElement('li');

        this.arrow_up = document.createElement('i');
        this.arrow_up.classList.add('fas');
        this.arrow_up.classList.add('fa-caret-up');

        this.arrow_down = document.createElement('i');
        this.arrow_down.classList.add('fas');
        this.arrow_down.classList.add('fa-caret-down');

        this.button_delete = document.createElement('button');
        this.button_delete.innerHTML = 'Supprimer';
        this.button_delete.classList.add('delete-button');

        this.button_hide = document.createElement('button');
        this.button_hide.innerHTML = 'Masquer';
        this.button_hide.classList.add('hide-button');
    },

    instantiate: function(article, id)
    {
        this.init();

        this.li.innerHTML = article;
        this.li.id = id;

        this.li.appendChild(this.arrow_up);
        this.li.appendChild(this.arrow_down);
        this.li.appendChild(this.button_delete);
        this.li.appendChild(this.button_hide);

        return this.li;
    },

    hide: function(which)
    {
        which.style.visibility = 'hidden';

        for (var button of which.children)
        {
            button.style.visibility = 'visible';
        }
    }
};




liste.display();


function handleUserInput(target)
{
    if (target.tagName == 'BUTTON')
    {
        switch(target.id)
        {
            case "button-add":
                liste.addArticleFromUserInput();
                break;
            case "button-delete-last":
                liste.removeListItem("last");
                break;
            default:
                if (target.classList.contains('hide-button')) {
                    liste.hideListItem(target.parentNode);
                } else if (target.classList.contains('delete-button')) {
                    liste.removeListItem(target.parentNode);
                }
        }
    }
    else if (target.tagName == 'I')
    {
        if (target.classList.contains('fa-caret-down'))
        {
            liste.moveItemDown(target.parentNode);
        }
        else if (target.classList.contains('fa-caret-up'))
        {
            liste.moveItemUp(target.parentNode);
        }
    }
}


document.addEventListener('click', function(e)
{
    handleUserInput(e.target);
});

document.getElementById('user-input').addEventListener('keydown', function(e)
{
   if (e.which == 13)
   {
       handleUserInput(e.target);
   }
});