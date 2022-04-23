import React, { useState } from 'react';

function AboutPage() {
  return (
    <div>
      <div className='row'>
        <div className='about_content'>
          <h1>Door2dooR</h1>
          <p>
            A platform that revolutionizes the way logistic companies handle
            parcels. Conventionally, a package is transferred from src to dest
            by just one company it creates a lot of delay. We can reform this
            system by introducing the concept of hotspots and multiple party
            collaboration. In this system we would divide the journey of a
            package into several sub-journeys. These sub-journeys will then be
            covered by various existing resources like local courier companies/
            road/rail/air transportation systems thus reducing the time
            consumed. These sub-journeys are chosen by considering cost, time
            and quality. Several routes are proposed among which client chooses
            one route suitable for him.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
