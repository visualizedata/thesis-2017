# Visualizing Law
### Understanding the sex offender registry laws and their collateral consequences

![preview](preview.png? "preview")

---

### Abstract

This thesis is about the visual exploration of the current sex offender registration and community notification laws in the United States. It is an attempt to understand how examining these laws and their impact on society from an objective lens can debunk myths and create awareness. It tries to explore the collateral consequences that these laws have, specifically the residence restrictions that are imposed on offenders, and raises questions about the effectiveness of their intentions. This work also aims to serve as a tool for lawmakers to visualize what the consequences of their actions might look like, and help them to preempt decisions that may not be in the best interest of society.

---

### Presentation slides (including project URL and video):

https://jainsambhav91.github.io/thesis/work/finalViz/

---

### Project URL:

* Residence and Employment Restrictions: https://goo.gl/DDfj6O
* Mobility and Presence Restrictions: https://goo.gl/3xphT6

---


### Feature List

Housing and Employment
* Show residential land use area 
* Show commercial/institutional land use area 
* Recalculate restricted area on map movement/map zoom --> changed to displaying restricted areas by neighborhood
* On hover, show restricted area for that neighborhood

Mobility and Presence
* Enter origin and destination locations
* Show possible violations
* Project violations on the side bar
* Explore violation locations - like schools/parks

---

### Represetative Images:


![Alt text](1.png?raw=true "Residence and Employment Restrictions")

![Alt text](2.png?raw=true "Mobility and Presence Restrictions")

---

#### Exploring sex offender laws by state:
(not included in final project) url: https://goo.gl/62Sv8G

![state laws](3.png? "state laws")
![state laws](4.png? "state laws")
![state laws](5.png? "state laws")




---

### Data Sources

<!--prototype:-->
<!--![Alt text](visualization/nationalLevelPrototype.jpg?raw=true "National Level Prototype")-->

#### National Level Data:
* Registered sex offenders by state (timeline): https://www.parentsformeganslaw.org/public/meganReportCard.html
* Summary of sex offender laws by state: http://all4consolaws.org/wp-content/uploads/2017/01/Summary-of-State-Registration-Laws-Concerning-Short.pdf


#### State Level (Illinois): 
* Illinois public sex offender registry: https://www.isp.state.il.us/sor/


#### City Level (Chicago):
* Chicago Land-use classification data: https://datahub.cmap.illinois.gov/
* Chicago neighborhood boundaries(parcel data available): https://data.cityofchicago.org/Facilities-Geographic-Boundaries/Boundaries-Neighborhoods/9wp7-iasj
* List of day care centers in Chicago (for scraping address and geocoding): http://childcarecenter.us/illinois/chicago_il_childcare?page=1
* List of public parks in Chicago (parcel data available): https://data.cityofchicago.org/Parks-Recreation/Parks-Shapefiles/5msb-wbxn/data
* List of schools in Chicago (for scraping address and gecoding): http://cps.edu/Schools/Elementary_schools/Pages/ElementaryIndex.aspx?Type=1&Filter=CPSSchoolGrade=Elementary%20school

