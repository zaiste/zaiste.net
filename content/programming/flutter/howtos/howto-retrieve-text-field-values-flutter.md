+++
+++

# How To Retrieve Text Field Values in Flutter

## Using `TextEditingController`

```dart
class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        TextFormField(controller: _usernameController),
        TextFormField(controller: _passwordController, obscureText: true),
        RaisedButton(
          onPressed: _performLogin,
          child: Text('Login'),
        )
      ],
    );
  }

  void _performLogin() {
    String username = _usernameController.text;
    String password = _passwordController.text;

    // DO a HTTP POST request to trigger an actual login procedure
  }
}

```

