/// <reference path="typings/jquery/jquery.d.ts" />

import Env = require("./Env");

var save_button_class = "alc-save__save-button";
var loader_class = "alc-save__loader";
var server_url: string = "";

document.addEventListener(Env.eventName, function(e: CustomEvent){
    Env.log(e.detail);
    server_url = e.detail.alcSaveUrl;
});

class SaveManager {
    url: string;
    method: string;
    static instance: SaveManager;

    constructor(url: string, method: string = "POST") {
        this.url = url;
        this.method = method;
    }

    public static getInstance(url: string, method: string = "POST") {
        if(SaveManager.instance == null) {
            SaveManager.instance = new SaveManager(url, method)
        } else {
            SaveManager.instance.url = url;
            SaveManager.instance.method = method;
        }
        return SaveManager.instance;
    }

    private static _activateLoader(element: JQuery) {
        element.hide();  // Button
        element.next().show();  // Loader
    }

    private static _deactivateLoader(element: JQuery) {
        element.show();  // Button
        element.next().hide();  // Loader
    }

    public saveWord(word: string, meaning: string, activeButton: JQuery) {

        SaveManager._activateLoader(activeButton);
        Env.log("Send request to :" + this.url);
        $.ajax({
            url: this.url,
            method: this.method,
            data: { word: word, meaning: meaning }
        })
            .done(function(data){
                if(data.code != 0) {
                    var err_msg = "Something wrong occurred in remote serer.";
                    alert(err_msg);
                    console.error(err_msg);
                }
                SaveManager._deactivateLoader(activeButton);
            })
            .fail(function(data){
                var err_msg = "Something wrong occurred in remote serer.";
                alert(err_msg);
                console.error(err_msg);
                console.error(data);
                SaveManager._deactivateLoader(activeButton);
            })
    }
}

class AlcSave {

    static isAlcSearch() {
        return location.href.indexOf("eow.alc.co.jp/search?q=") != -1
    }

    static createButtons() {
        var $btn = $("<button/>");
        $btn.addClass(save_button_class);
        $btn.text("Save");

        var $loader = $("<img/>");
        $loader.addClass(loader_class);

        $(".midashi").after($loader).after($btn);
    }

    static registerEvent() {
        $(".midashi").parent().on("click", "." + save_button_class, function(){
            var word = AlcSave._getMidashiText($(this));
            var midashi = AlcSave._getFirstMeaning($(this));
            SaveManager.getInstance(server_url).saveWord(word, midashi, $(this));
        });
    }

    private static _getMidashiText(self) {
        return self.prev().text()
    }

    private static _getFirstMeaning(self) {
        var $next = self.next().next();
        var ol = $next.children("div ol")[0];

        var $fm;
        if(ol != null) {
            var $ol = $(ol);
            var li = $ol.children("li")[0];

            if(li != null) {
                var $li = $(li);
                Env.log("There is div > ol > li statement");
                $fm = $li;

            } else{
                Env.log("There is div > ol statement");
                $fm = $ol;
            }
        } else {
            Env.log("There is no div > ol statement");
            $fm = $next;
        }

        return $fm.text();
    }
}

$(document).ready(function(){
    if(AlcSave.isAlcSearch()) {
        AlcSave.createButtons();
        AlcSave.registerEvent();
    }
});