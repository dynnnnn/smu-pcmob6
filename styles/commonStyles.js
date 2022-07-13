export const commonStyles = {
  button: {
    backgroundColor: 'black',
    borderRadius: 15,
    width: "50%",
    alignItems: "center"
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 20, 
    margin: 10,
    color: 'white',
  },
  title: {
    fontWeight: "bold",
    fontSize: 30, 
    textAlign: 'center',
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
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 15,
    padding: 5
  },
  label: {
    fontWeight: "bold",
    fontSize: 15, 
    textAlign: 'center',
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
    height: 100,
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
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
    backgroundColor: "#878683",
  },
  text: {
    color: "white",
  },
  header: {
    backgroundColor: "#444444",
    height: 100,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f4d47c"
  },
  headerTint: "#f4d47c"
}