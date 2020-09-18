# Brushing Window Signal Integration Tool

designed for the analysis of time-resolved X-ray scattering difference patterns

Arnold Chan | 09/18/2020 | IDEAS FSS-Vis Final Project
____________________________________________________________________

## Scientific Background:

Protein function is strongly associated with its three-dimensional structure. Studying the dynamics of fundamental protein folding can provide insight towards understanding cellular signaling and even inspiring the design of synthetic enzymes and pharmaceuticals. One type of protein interaction in metalloproteins are a metal-ligand coordination, which stabilizes structure and can regulate enzymatic reactivity at the metal active site. Cytochrome c (cyt c) is an iron-centered heme protein involved in the mitochondrial electron transport chain and cell apoptosis. Cyt c serves as a model system for studying the mechanism of metalloprotein folding. In this experiment, cyt c is prepared in a denatured ground state with a carbon monoxide (CO) ligand bound to the heme, which is then photolyzed with a pulsed laser (<10 ns) to induce folding. Time-delayed x-ray scattering snapshots are measured to capture global structural information and represented as scattering difference patterns to highlight the transient change from before and after CO photolysis. (Hsu et al. Chem. Sci. 2019, 10, 9788-9800)

## Software Choice and Methodology:

I chose to use D3 tools along with html, CSS, and JavaScript to create an interactive viewing and data analysis tool for analyzing time-resolved x-ray scattering difference patterns. Since part of the data analysis involves looking at the integrated signal across the time series, I wanted to utilize the brushing window feature in D3 to generate a live-updating signal integration versus time delay plot. Additionally, I used mouseover tools to connect all the representations of my data, such that the user can visualize which curve corresponds to which signal integration value. Due to my unfamiliarity with JavaScript, I initially struggled with designing the update and transition scheme necessary connect the three panels of my tool as one cohesive device. However, once I overcame the organization scheme and prepared my data in a way what would allow for proper assignment of variables, I was able to implement the function and further polish the aesthetics. 

The finished interactive tool has a plot on the left with a staggered display of the time series and the brushing window to select bounds for signal integration. The top right contains a plot with a cropped overlayed plot of the time series according to the updated bounds of the brushing window, and the bottom right contains the signal integration (area) of each curve plotted according to its corresponding time delay. The right column elements are also sensitive to mouse over to highlight the specific curve in all three panels, giving the entire tool a cohesive feel. To use the tool, the user should format a data matrix like “cyt_c_co_ds.csv” with a top row of labels beginning with “q” and followed by unique valid IDs. The first leftmost column is the q vector and each column afterwards should be the difference scattering patterns. The user also needs to input the text for the difference scattering time labels as variables “td_str” and “td”. The user should adjust the x-/y-axis bounds and staggered offset as needed.

## Results:

From using my visualization, I am comparing the x-ray scattering difference patterns in the time series and bring to attention key features along the x-axis. This shows transient evidence for the observation of a ground state to an intermediate to a final native state.
