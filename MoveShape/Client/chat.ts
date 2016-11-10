﻿namespace Chat
{
    export declare var messages : Array<DrawableText>;
    export declare var messageindex : number;
    export declare var keyMap: {};
    export declare var keyStates: {};
    export declare var currentmessage: DrawableText;
    export declare var lastmessage: string;
    export declare var chatactivated: boolean;
    export declare var sentmessage: boolean;
    export declare var initialized: boolean;

    export function newMessage(message: string) {
        let temp = Array<string>();
        for (let i = 0; i < messages.length; i++) {
            temp.push(messages[i].text);
        }  
        for (let i = 0; i < messages.length - 1; i++) {
            messages[i + 1].text = temp[i];
        }
        messages[0].text = message;
        console.log(message);
    }

    export function windowResize()
    {
        currentmessage.position.y = window.innerHeight - 25;
        for (let i = 0; i < messages.length; i++)
        {
            messages[i].position.y = window.innerHeight - 50 - i * 20;
        }
    }

    export function init()
    {
        messages = new Array<DrawableText>();
        messageindex = 0;
        for (let i = 0; i < 10; i++) {
            let mes = new DrawableText();
            mes.setTexture(GFX.textures["font1"]);
            mes.depth = -1;
            mes.characterScale = 2;
            mes.position.y = window.innerHeight - 50 - i * 20;
            mes.position.x = 20;
            mes.screenSpace = true;
            mes.text = "";
            GFX.addDrawable(mes);
            this.messages.push(mes);
        }

        chatactivated = false;

        currentmessage = new DrawableText();
        currentmessage.setTexture(GFX.textures["font1"]);
        currentmessage.depth = -1;
        currentmessage.characterScale = 2;
        currentmessage.position.y = window.innerHeight - 25;
        currentmessage.position.x = 20;
        currentmessage.screenSpace = true;
        currentmessage.text = "Press enter to chat";
        GFX.addDrawable(currentmessage);
        sentmessage = false;
        initialized = true;
    }

    export function clearCurrentMessage()
    {
        currentmessage.text = "";
    }

    export function sendCurrentMessage()
    {
        if (currentmessage.text.length > 0) {
            lastmessage = currentmessage.text;
            sentmessage = true;
            currentmessage.text = "Press enter to chat";
        }
    }

    export function addKeyToCurrentMessage(char: string, capitalized: boolean)
    {
        if (capitalized) {
            currentmessage.text = currentmessage.text + char.toUpperCase();
        } else {
            currentmessage.text = currentmessage.text + char;
        }
    }

    export function deleteLastKeyFromCurrentMessage() {
        currentmessage.text = currentmessage.text.slice(0, -1);
    }

    export function clear() {
        for (let i = 0; i < messages.length; i++) {
            messages[i].text = "";
        }
        messageindex = 0;
    }  
}