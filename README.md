# redux-fetch-flow
An opinionated framework for loading states, data fetching and route behavior - for react applications utilizing react-router and redux

### Introduction

React applications that asynchronusly fetch data from a server and then render that data have common problems with not so obvious solutions:

1. Where do I put asynchronus data fetching in my react component? (or should it go in redux)

2. How do I set loading states? How can I avoid putting isLoading and dataLoaded flags everywhere?

3. How do I avoid infinite loops on componentDidMount?

4. How does browser navigation interact with data fetching?

Most importantly...

### How Can I have a consistent, intuitive experience for the user while using my single page application?





