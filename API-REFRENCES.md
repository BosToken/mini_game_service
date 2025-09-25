
## API Reference

### Users

#### Get user by id
```http
  GET /user/id/${id}
```

#### Create user
```http
  POST /user/create/${id}
```
Body : 
| Key        | Type     | Level      | Description                                              |
| :--------- | :------- | :--------- | :------------------------------------------------------- |
| `username` | `string` | `optional` | username of user (unique). |
| `email`       | `string` | `optional` | email of user (unique).         |
| `password`       | `string` | `optional` | password of user.         |
| `discordId`       | `string` | `optional` | discordId of user.         |

#### Update user
```http
  POST /user/update
```
Authorization with JWT :
| Key        | Value    | Description                                              |
| :--------- | :------- | :-------------------------------------------------------  | 
| `Authorization` | Bearer `token` | An authorization header containing a JWT token to verify the user's identity. |

Authorization with Bot Secret :
| Key        | Value    | Description                                              |
| :--------- | :------- | :-------------------------------------------------------  |
| `x-discord-Id` | `discordId` | The user ID or bot ID on Discord that sends the request is used to identify the identity. |
| `x-bot-secret` | `BOT_SECRET` | A secret key set on the `.env` to validate that the request comes from a legitimate bot. |

Body : 
| Key        | Type     | Level      | Description                                              |
| :--------- | :------- | :--------- | :------------------------------------------------------- |
| `username` | `string` | `optional` | username of user (unique). |
| `email`       | `string` | `optional` | email of user (unique).         |
| `password`       | `string` | `optional` | password of user.         |
| `discordId`       | `string` | `optional` | discordId of user.         |

### Card

#### Get by user
```http
  GET /card/user
```
Body :
| Key        | Type     | Level      | Description                                              |
| :--------- | :------- | :--------- | :------------------------------------------------------- |
| `username` | `string` | `optional` | username of user. |
| `email`       | `string` | `optional` | email of user.        |
| `discordId`       | `string` | `optional` | discordId of user.         |

#### Request random card
```http
  GET /card/random
```
Authorization with JWT :
| Key        | Value    | Description                                              |
| :--------- | :------- | :-------------------------------------------------------  | 
| `Authorization` | Bearer `token` | An authorization header containing a JWT token to verify the user's identity. |

Authorization with Bot Secret :
| Key        | Value    | Description                                              |
| :--------- | :------- | :-------------------------------------------------------  |
| `x-discord-Id` | `discordId` | The user ID or bot ID on Discord that sends the request is used to identify the identity. |
| `x-bot-secret` | `BOT_SECRET` | A secret key set on the `.env` to validate that the request comes from a legitimate bot. |

### Rarity

#### Get all rarity
```http
  GET /rarity
```

#### Get rarity by id
```http
  GET /rarity/id/${id}
```

### Role

#### Get all Role
```http
  GET /role
```

#### Get role by id
```http
  GET /role/id/${id}
```

### Team

#### Get team by id
```http
  GET /team/id/${id}
```

#### Get team by user
```http
  GET /team/user
```
Body :
| Key        | Type     | Level      | Description                                              |
| :--------- | :------- | :--------- | :------------------------------------------------------- |
| `username` | `string` | `optional` | username of user. |
| `email`       | `string` | `optional` | email of user.        |
| `discordId`       | `string` | `optional` | discordId of user.         |

#### Update team
```http
  POST /team/update
```
Authorization with JWT :
| Key        | Value    | Description                                              |
| :--------- | :------- | :-------------------------------------------------------  | 
| `Authorization` | Bearer `token` | An authorization header containing a JWT token to verify the user's identity. |

Authorization with Bot Secret :
| Key        | Value    | Description                                              |
| :--------- | :------- | :-------------------------------------------------------  |
| `x-discord-Id` | `discordId` | The user ID or bot ID on Discord that sends the request is used to identify the identity. |
| `x-bot-secret` | `BOT_SECRET` | A secret key set on the `.env` to validate that the request comes from a legitimate bot. |

Body :
| Key        | Type     | Level      | Description                                              |
| :--------- | :------- | :--------- | :------------------------------------------------------- |
| `cardId` | `array` | `required` | A collection of card IDs owned by users. The minimum data is `1`, and the maximum data is `3`. |

### Battle

#### Random battle
```http
  GET /battle/enemy/random
```
Authorization with JWT :
| Key        | Value    | Description                                              |
| :--------- | :------- | :-------------------------------------------------------  | 
| `Authorization` | Bearer `token` | An authorization header containing a JWT token to verify the user's identity. |

Authorization with Bot Secret :
| Key        | Value    | Description                                              |
| :--------- | :------- | :-------------------------------------------------------  |
| `x-discord-Id` | `discordId` | The user ID or bot ID on Discord that sends the request is used to identify the identity. |
| `x-bot-secret` | `BOT_SECRET` | A secret key set on the `.env` to validate that the request comes from a legitimate bot. |

#### Request battle
```http
  POST /battle/enemy/request
```
Authorization with JWT :
| Key        | Value    | Description                                              |
| :--------- | :------- | :-------------------------------------------------------  | 
| `Authorization` | Bearer `token` | An authorization header containing a JWT token to verify the user's identity. |

Authorization with Bot Secret :
| Key        | Value    | Description                                              |
| :--------- | :------- | :-------------------------------------------------------  |
| `x-discord-Id` | `discordId` | The user ID or bot ID on Discord that sends the request is used to identify the identity. |
| `x-bot-secret` | `BOT_SECRET` | A secret key set on the `.env` to validate that the request comes from a legitimate bot. |

Body:
| Key        | Type     | Level      | Description                                              |
| :--------- | :------- | :--------- | :------------------------------------------------------- |
| `enemy` | `object` | `required` | Objects containing information about enemies to be fought. Must include at least one enemy identity. |
| `enemy.id` | `string` | `optional` | id of user. |
| `enemy.username` | `string` | `optional` | username of user. |
| `enemy.email` | `string` | `optional` | email of user. |
| `enemy.discordId` | `string` | `optional` | discordId of user. |

### Authorization

#### Login
```http
  POST /auth/login
```
Body:
| Key        | Type     | Level      | Description                                              |
| :--------- | :------- | :--------- | :------------------------------------------------------- |
| `email` | `string` | `required` | The user's email address used for authentication/login. |
| `password` | `string` | `required` | The user password that matches the registered account. |
