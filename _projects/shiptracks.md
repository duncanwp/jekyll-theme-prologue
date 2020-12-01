---
title: Detecting Ship-tracks
layout: project
icon: fa-ship
icon-style: regular
---

Studied for many decades now, ship-tracks are a classic example of aerosol-cloud interactions. These perturbations to cloud albedo by aerosol emitted from ship exhaust are however very local and attempts to understand their relevance in terms of estimating global cloud droplet number and liquid water sensitivities flounder on the question of their representativeness. 

<span class="image"><img src="{{ 'assets/images/shiptracks.jpg' | relative_url }}" alt="Shiptracks in the North-East
 Atlantic" /></span>

I have developed a deep convolutional neural network model trained on several existing hand-logged
 datasets to automatically detect these ship-tracks in observations and develop large-scale statistics about their
  prevalence and properties using MODIS imagery.

<span class="image left"><img src="{{ 'assets/images/shiptracks_and_ships.gif' | relative_url }}" alt="Shiptracks in the
 North
-East
 Atlantic" /></span>
 
Recently, I've also run the model using Geostationary
  Operational Environmental Satellite (GOES)-16 images every hour for the year of 2018 to create a dataset of ship
  -tracks from across the
  East Pacific . These automatically logged ship-tracks are then combined emissions estimates from an Automatic
   Identification System (AIS) shipping inventory over the region (in green) in order to determine the sensitivity of
    ship-track
    occurrence (yellow) to ship emissions under differing conditions.
    
Exploring these meteorological controls on shiptrack prevelance in this region by combining these detections with
 reanalysis data is ongoing. An improved ML model, and daytime imagery will also allow for increased precision and
  reduced noise in our sensitivity estimates.
