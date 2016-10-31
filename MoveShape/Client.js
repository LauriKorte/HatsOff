﻿
$(function () {
    function Player(s, i)
    {
        this.$shape = s;
        this.ID = i;
    }

    var players = [];

    //players.find((x)=>x.ID == 3);

    var myId;
    var me = document.createElement('div');
    me.id = "myShape";
    document.getElementsByTagName('body')[0].appendChild(me);
    var moveShapeHub = $.connection.moveShapeHub,
        $shape = $("#myShape"),
        // Send a maximum of 10 messages per second
        // (mouse movements trigger a lot of messages)
        messageFrequency = 5,
        // Determine how often to send messages in
        // time to abide by the messageFrequency
        updateRate = 1000 / messageFrequency,
        PlayerActor = {
            x: 0,
            y: 0,
            id: 0
        }
    var moved = false;

    findPlayerByID = function (id)
    {
        return players.find((x) =>x.ID == id);
    }
            
    moveShapeHub.client.updateShapes = function (models) {
        for(var i = 0; i < models.length; i++) {
            var a = findPlayerByID(models[i].id);
            if(a)
            {
                //Create a new test particle with maximum size of 16 by 16
                //(defined in Client/gfx/box.ts)

                var dtp = new DrawableTestParticle({ x: 16, y: 16 });

                //Set the particle color to random tone of orange
                dtp.color.r = 1.0;
                dtp.color.g = Math.random();
                dtp.color.b = 0.0;

                //Set the particle position
                dtp.position.x = models[i].x + 50;
                dtp.position.y = models[i].y + 50;

                //Hand it to the GFX engine, it'll take care of the rest

                GFX.addDrawable(dtp);

                $("#player" + a.ID).animate({ left: models[i].x + "px", top: models[i].y + "px" }, { duration: updateRate, queue: false });
            }
            
            //players[models[index].id].$shape.animate(models[index], { duration: updateRate, queue: false });
        }
        // Gradually move the shape towards the new location (interpolate)
        // The updateRate is used as the duration because by the time
        // we get to the next location we want to be at the "last" location
        // We also clear the animation queue so that we start a new
        // animation and don't lag behind.
    };

    moveShapeHub.client.playerDisconnected = function(disconnectedPlayers)
    {
        for (var i = 0; i < disconnectedPlayers.length; i++) {
            var a = findPlayerByID(disconnectedPlayers[i].id);
            if (a) {
                a.$shape.remove();
                var index = players.indexOf(a);
                if (index > -1) {
                    players.splice(index, 1);
                }
            }

        }
    }
    moveShapeHub.client.getMyID = function(ID)
    {
        myId = ID;
        PlayerActor.id = ID;
    }

    addPlayer = function(model)
    {
        var player = document.createElement('div');
        player.id = "player" + model.id;
        player.className = 'player';
        document.getElementsByTagName('body')[0].appendChild(player);
        var newplayer = new Player($("#" + player.id), model.id);
        newplayer.$shape.animate({ left: model.x + "px", top: model.y + "px" });
        players.push(newplayer);
    }

    moveShapeHub.client.addPlayer = function (model) {
        addPlayer(model);
    }

    moveShapeHub.client.addPlayers = function(playerlist)
    {
        for(var i = 0; i < playerlist.length; i++)
        {
            addPlayer(playerlist[i]);
        }
    }

    $.connection.hub.start().done(function () {
        $shape.draggable({
            drag: function () {
                PlayerActor.x = $shape.offset().left;
                PlayerActor.y = $shape.offset().top;
                moved = true;
            }
        });
        // Start the client side server update interval
        setInterval(updateServerModel, updateRate);
        moveShapeHub.server.addPlayer();
        moveShapeHub.server.getPlayers();
    });
    function updateServerModel() {
        // Only update server if we have a new movement
        if (moved) {
            moveShapeHub.server.updateModel(PlayerActor);
            moved = false;
        }
    }
});
