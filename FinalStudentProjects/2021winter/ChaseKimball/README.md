# Searching for Multigenerational Black Hole Mergers

Chase Kimball | 02/01/2021 | IDEAS FSS-Vis Final Project

[A live version is available here.](https://ageller.github.io/IDEAS_FSS-Vis/FinalStudentProjects/2021winter/ChaseKimball/index.html)

Note: This is a copy of Chase's GitHub repo: https://github.com/chase-kimball/second_gen_viz
____________________________________________________________________


LIGO's [GWTC-2 catalog](https://arxiv.org/abs/2010.14527) of GW observations is largely made up of signals from binary black hole (BBH) mergers. Some of these binaries contain black holes with masses that may lie in the "pair-instability mass gap", a mass regime where it is thought that black holes cannot form directly from stars. One possibility is that these heavy black holes are the result of previous black hole mergers in a dynamical environment. If those merger products are not kicked out of their dynamical environment, they may go on to merge again as a multi-generational merger. In [Kimball et al. 2020](https://arxiv.org/abs/2011.05332), we ask whether LIGO's GWTC-2 catalog contains multi-generational mergers. This is a visualization of some of those results.

## IDEAS Visualization Workshop Final Project

On the left side of the page is a scatter plot of the median inferred mass ratio and primary BH mass for 44 BBH mergers from GWTC-2. The circles are sized according to the inferred chirp mass. Hover over a circle to see the name (GWYYMMDD) of each binary black hole. We use the public parameter-estimation posteriors for these events provided by LIGO to infer a BBH population which allows for individual BHs to be either 1G or 2G (i.e. the result of a previous merger). The normalized population distributions for the masses and spins of 1G and 2G black holes are plotted in the middle pannel (Note: Since 1G+1G merger products are frequently ejected from their dynamical environment and unable to merge again, multi-generational mergers are rare relative to 1G+1G mergers, so the contribution of 2G populations to the total overall population is much smaller than it appears in this plot). Since there are 2 BHs in a BBH merger, a LIGO BBH may be either 1G+1G, 1G+2G, or 2G+2G, as illustrated on the right-hand side of the page. 

For each of the 44 BBH mergers, we take their masses and spins, together with the inferred BBH population distributions, and compute the probability that that merger is multigenerational. Each of the circles in the scatter plot is colored according to the probability that the BBH merger it represents is multigenerational (i.e. contains a 2G black hole). Click on an event to plot its masses and spins over the population distributions. The resulting posterior is colored according to P(2G|x), where x is either the primary/secondary BH mass/spin according to the panel. Since the contribution of the 2G distributions is relatively low, note that P(1G|x)>P(2G|x), except in regions where the 1G distribution is *very* small compared to the 2G distribution (noticeably, in the pair instability mass-gap ~50-120 solar masses). On the right hand side, we display the probability that the merger is specifically 1G+1G, 1G+2G, or 2G+2G, and shade the icons accordingly.

While the analysis in Kimball et al. 2020 explores a range of globular cluster models for the dynamical environment of BBH mergers, this visualization only includes the results assuming a dynamical environment with an escape velocity of 300 km/s, which is very large for a typical globular cluster, but may be typical of environments like active galactic nuclei.

This visualization was (poorly) written in CSS, HTML, and Javascript with the use of the [D3.js](https://d3js.org/) library
