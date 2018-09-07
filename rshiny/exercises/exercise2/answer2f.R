
library(shiny)
library(readr)
library(ggplot2)

data <- read_csv("africadata.csv")
africamap <- 

ui <- fluidPage(
  theme = shinytheme("cerulean"),
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
      tabsetPanel(
        tabPanel("All", plotOutput("plot1")),
        tabPanel("By Region", plotOutput("regionplot"))
      ),
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

