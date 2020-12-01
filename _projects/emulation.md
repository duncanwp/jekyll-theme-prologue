---
title: Climate model emulation
layout: project
icon: fa-tachometer-alt
icon-style: regular
order: 1
---

Large computer models requiring hundreds of input parameters, taking thousands of core-hours to run
, and producing terabytes of output are ubiquitous in the earth sciences. As I discuss in my recent [perspective
 paper](https://arxiv.org/abs/2008.10679), it is becoming
 common practice to develop emulators as fast approximations of these models in order to explore the relationships between these inputs and outputs, understand uncertainties and generate large ensembles datasets. 

Primarily, I build emulations using Gaussian Process regression across different (uncertain) input parameters in
 order to allow fast sampling for likelihood-free inference. (Basically determining the parameter combinations which
  produce outputs which are compatible with the available observations.) I've used this approach for
   constraining parametric
   uncertainty in both the [direct](https://doi.org/10.1029/2020GL087141) and [first indirect
](https://doi.org/10.1073/pnas.1922502117)
 aerosol effects.
 
I have developed [GCEm](https://github.com/duncanwp/GCEm) as an open source tool providing a general workflow for emulating and validating a
 wide variety of climate models and outputs. It is built on well established, high performance libraries to
  ensure robustness, extensibility and scalability. I've also been involved with the development of a novel neural [architecture search algorithm](https://arxiv.org/abs/2001.08055) for general emulation of
 physical simulations, which was [higlighted by Science magazine](https://www.sciencemag.org/news/2020/02/models-galaxies-atoms-simple-ai-shortcuts-speed-simulations-billions-times).

 
## Relevant papers
 - **Watson-Parris, D.**, Deaconu, L., Williams, A., Stier, P. "GCEm v1.0.0 – An open, scalable General Climate Emulator
 ". *In prep.*
 -  **Watson-Parris, D.** "Machine learning for climate and weather are
    worlds apart". *Accepted at Phil. Tran. A:*
    <https://arxiv.org/abs/2008.10679>
 - McCoy, I. L., McCoy, D. T., Wood, R., Regayre, L., **Watson- Parris,
    D.**, Grosvenor, D. P., Mulcahy, J., Hu, Y., Bender, F. A. M.,
    Field, P. R., Carslaw, K., Gordon, H. "The hemispheric contrast in
    cloud microphysical properties constrains aerosol forcing".
    *Proceedings of the National Academy of Sciences 117 (32)
    18998-19006:* <https://doi.org/10.1073/pnas.1922502117>
 - **Watson-Parris, D.**, Bellouin, N., Deaconu, L., Schutgens, N.,
    Yoshioka, M., Regayre, L. A., Pringle, K. J., Johnson, J. S.,
    Carslaw, K. S. & Stier, P. "Constraining uncertainty in aerosol
    direct forcing". *Geophysical Research Letters, 47:*
    <https://doi.org/10.1029/2020GL087141>
 - Kasim, M. F., **Watson-Parris, D.**, Deaconu, L. ,
    Topp-Mugglestone, J. , Hatfield, P., Froula, D. H., Gregori, G.,
    Jarvis, M. , Korenaga, J., Viezzer, E. & Vinko S. M. "Accelerating
    simulations in science with deep neural architecture search".
    *Submitted Nature Communications*: <https://arxiv.org/abs/2001.08055>  

## Code
 - <https://github.com/duncanwp/GCEm>