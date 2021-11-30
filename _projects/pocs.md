---
title: Pockets of Open Cells
layout: project
icon: fa-cloud
icon-style: solid
order: 2
---

Pockets of Open Cells (POCs) have been a source of interest since they were first described 15 years ago due to their complex nature and the importance of stratocumulus decks on the global climate. Indeed, it has been proposed that, by suppressing precipitation, anthropogenic aerosol could significantly reduce the occurrence of POCs and, through the increased cloud fraction, provide a large cooling affect on the Earth. To date, however, no large-scale analysis has been performed. 

Using a deep convolutional neural network trained on a small hand-logged dataset however, we created a unique and
 comprehensive dataset of POCs from across the Californian, Peruvian and Namibian stratocumulus decks, spanning the whole lifetime of the MODIS mission. We detected and analysed 8,491 POCs, quantifying their spatial and temporal distributions, as well as investigating their microphysical properties. 
 
<span class="image"><img src="{{ 'assets/images/example_poc.png' | relative_url }}" alt="An automatically detected
 Pocket of Open Cells" /></span>
 *Fig. 1: An example Pocket of Open Cells highlighted using a machine learning algorithm in a MODIS satellite image.*

POCs show a large, and remarkably consistent, difference in droplet effective radius compared to the surrounding
 clouds, but negligible difference in liquid water path. Further, we found that the global radiative effect of POCs
 , and hence the maximum forcing through any aerosol perturbation, is only approximately 20mWm-2. Therefore, the
  potential for strong anthropogenic perturbations appears small. 
  
Ongoing work tracking the POC lifecycle in geostationary satellite imagery is investigating why POCs form, and what
 affect they might have on the breakup of stratocumulus cloud in to trade cumulus.


## Relevant papers
 -  **Watson-Parris, D**., Sutherland, S. A., Christensen, M. W. &
    Stier, P. "A large-scale analysis of pockets of open cells and their
    radiative impact". *Submitted Geophysical Research Letters:*
    <https://doi.org/10.1002/essoar.10501877.1>
 - **Watson-Parris, D.**, Sutherland, S., Christensen, M., Caterini,
    A., Sejdinovic, D., Stier, P. "Detecting anthropogenic cloud
    perturbations with deep learning" *Climate Change: How Can AI Help?
    workshop at ICML 2019, Long Beach, California:*
    <https://arxiv.org/abs/1911.13061>  

## Code
 - <https://github.com/climate-processes/poc-detection>

## Data 
 - The hand-labelled tracks and images used for training can be found here: <https://imiracli-data.s3.us-east-2.
   amazonaws.com/public/POC+training.zip>
 - The resulting database of 8,491 POCs can be found here: <https://doi.org/10.5281/zenodo.4451345>