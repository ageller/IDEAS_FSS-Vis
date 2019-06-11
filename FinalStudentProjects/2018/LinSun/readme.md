# Lin Sun's Final Project
# Visualizing the Emission Distribution and Spectra of UCNP and AuNP Superlattices


This code will allow direct visualization of the emission spectra of DNA-assembled upconversion and gold nanoparticle superlattices. Due to the complex nature of the system, both viewing **how the sample emits at different locations at each individual wavelength** and **how the emission spectrum is like at each location** will help 
provide insights into how the system behaves. 


The top plot provides a 2D map of emission distribution. By the slider on top to choose different wavelengths, thus allowing quick comparison between the emission distribution at different wavelength. This would provide insights the effect of crystal shape and orientation on the emission spectrum.  The bottom plot contains a 2D map of emission distribution summed over the entire spectrum. By clicking on the 2D map, we can pick any point on the image and plot out the emission spectrum, which enables detailed analysis at picked location.


The plots are made with bokeh and written and viewed in Jupyter Notebook (the html file is too large due to the large data size). This is advantageous for my future data analysis due to it's interactive features. The main challenge of this project is making an interactive 2D image in bokeh, which seems to have limited examples online.


The data files can be downloaded from [this Box folder](https://northwestern.box.com/s/vv1l0i88grnq9e7w1oo9wy8r4axplt21).
