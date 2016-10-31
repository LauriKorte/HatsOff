﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace Hatsoff
{
    public class Map
    {
        [JsonProperty("mapstate")]
        public MapState mapstate;
        [JsonProperty("triggerareas")]
        public Dictionary<string, TriggerArea> areas;
        public Map()
        {
            areas = new Dictionary<string, TriggerArea>();
            areas.Add("TownEntrance", new TriggerArea(200, 200, 100, 100));
            mapstate = new MapState();
        }
    }

    public class MapState
    {
        [JsonProperty("playerlist")]
        public List<PlayerActor> playerlist { get; set; }
        public MapState()
        {
            playerlist = new List<PlayerActor>();
        }
    }

    public class TriggerArea
    {
        [JsonProperty("x")]
        private double _x;
        [JsonProperty("y")]
        private double _y;
        [JsonProperty("sizex")]
        private double _sizex;
        [JsonProperty("sizey")]
        private double _sizey;
        public TriggerArea(double x, double y, double sizex, double sizey)
        {
            _x = x;
            _y = y;
            _sizex = sizex;
            _sizey = sizey;
        }
    }
}