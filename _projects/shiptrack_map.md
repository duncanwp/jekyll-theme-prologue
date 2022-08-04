---
title: Ship-track viewer
layout: project
icon: fa-map
icon-style: solid
order: 4
---

Easily browse all the ship-tracks detected in [Watson-Parris et al. 2022]() using our machine learning
algorithm. Each track as an associated MODIS timestamp so you can easily match with the underlying data. See the 
[ship-track detection](shiptracks) page for more details on their importance and effects. 

<div id="map">
    <div id="info-box">
        <p>Date: <input type="text" id="datepicker" class="date"></p>
        Info: <span id="info"></span>
    </div>
</div>
 
*Note*, these tracks have been simplified and compressed for easy browsing. They are also not always very obvious in RGB imagery shown above, but the detection algorithm uses a microphysical composite as described in the paper. If you need the exact tracks used in our analysis please see the links below. 

## Data
 - The shiptrack database can be found on Zenodo: TBC
 - The raw inference masks are much bigger but also freely available here: TBC  
 

