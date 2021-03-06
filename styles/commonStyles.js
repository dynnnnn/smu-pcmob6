export const commonStyles = {
  
  button: {
    backgroundColor: '#18dbd8',
    borderRadius: 5,
    width: 350,
    alignItems: "center",
    margin: 5
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 17, 
    margin: 10,
    color: 'black',
  },
  title: {
    fontWeight: "bold",
    fontSize: 24, 
    textAlign: 'center',
    padding: 8
  },
  content: {
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'center',
  },
  card:{
    height: 250,
    width: '50%'
  },
  greybox:{ 
    width: '80%',
    backgroundColor: '#f2f2f2',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 15,
    padding: 5,
    alignItems: 'center'
  
  },
  label: {
    fontWeight: "bold",
    fontSize: 16, 
    textAlign: 'center',
  },
  dialog: {
    fontSize: 17, 
    textAlign: 'center',
    padding: 10
  },
  dialogbutton: {
    backgroundColor: 'red',
    borderRadius: 15,
    width: 100,
    alignItems: "center",
    margin: 10
  },
  dialogcancelbutton: {
    backgroundColor: 'grey',
    borderRadius: 15,
    width: 100,
    alignItems: "center",
    margin: 10
  },
  dialogbox:{ 
    width: '80%',
    backgroundColor: '#efefef',
    alignSelf: 'center',
    borderRadius: 8,
    margin: 30,
    padding: 10,
    alignItems: 'center'
  
  },
}

export const lightStyles = {
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    color: "black",
  },
  header: {
    backgroundColor: "white",
    height: 140,
    
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black"
  },
  // headerTint: "#f55"
};

export const darkStyles = {
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    color: "white",
  },
  header: {
    backgroundColor: "black",
    height: 140,
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  },
  headerTint: "#18dbd8"
}