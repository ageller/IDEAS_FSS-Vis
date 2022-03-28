
library(shiny)
library(readr)
library(ggplot2)

data <- read_csv("africadata.csv")

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
      plotOutput("plot1", brush="plot1_brush"),
      tags$caption("Data Source: ", a("African Development Bank Statistical Data Portal",
                     href="http://dataportal.opendataforafrica.org"))
    )
  ),
  hr(),
  verticalLayout(
    DT::dataTableOutput("datatable1")
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
  
  output$datatable1 <- DT::renderDataTable({
    if(is.null(input$plot1_brush)) {
      data
    } else {
      req(input$plot1_brush)
      pts <- brushedPoints(data, input$plot1_brush, xvar="area", yvar=input$yval) 
      pts <- subset(pts, !is.na(pts[input$yval])) # there are other ways to do this
      req(nrow(pts) > 0)
      pts
    }
  })
}

shinyApp(ui = ui, server = server)

