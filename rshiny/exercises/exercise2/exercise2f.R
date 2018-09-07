
library(shiny)
library(readr)
library(ggplot2)
library(shinythemes)

data <- read_csv("africadata.csv")
africamap <- 

ui <- fluidPage(
  titlePanel("Africa: Country Size"),
  
  sidebarLayout(
    sidebarPanel(
      selectInput(inputId = "yval", 
                  label = "Y-axis:",
                  choices = c("GDP" = "gdp_2017", "Population" = "pop_2017",
                                 "Railroads" = "rail", "Roads" = "road"),
                  selected = "gdp_2017")
    ),
    mainPanel(
      plotOutput("plot1"),
      tags$caption("Data Source: ", a("African Development Bank Statistical Data Portal",
                                        href="http://dataportal.opendataforafrica.org"))
    )
  )
)

server <- function(input, output) {
  
  output$plot1 <- renderPlot({ 
    # use aes_string below, instead of aes, because input$y is text
    ggplot(data, aes_string(x="area", y=input$yval)) + 
      geom_point() + 
      geom_smooth(color="red", method="lm") +
      xlab("Area (sq km)") + 
      theme_minimal()
  })
  
  # this is the code that will render the new plot to add above
  output$regionplot <- renderPlot({
    ggplot(data, aes_string(x="area", y=input$yval)) + 
      geom_point() + 
      geom_smooth(color="red", method="lm") +
      xlab("Area (sq km)") + 
      facet_wrap("region") +
      theme_minimal()
  })

}

shinyApp(ui = ui, server = server)

