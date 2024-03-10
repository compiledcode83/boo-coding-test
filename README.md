## Install dependencies

Do:

```
npm install

```

## Start the app

Do:

```
npm start

```

## To Run Tests

Run the command:

```
npm run test

```

# API Endpoints

## Profiles..

_POST_ ``

- create a new profile.

Request Body

```
{
    name: <choice_name>,
    description: <choice_description>,
    mbti: <choice_mbti>,
    enneagram: <choice_enneagram>,
    variant: <choice_variant>,
    tritype: <choice_tritype>,
    socionics: <choice_socionics>,
    sloan: <choice_sloan>,
    psyche: <choice_psyche>,
}
```

Response - 201

Response - 500

_GET_ `/:profileId`

- Single profile information

Response - 200

```
profile
```

Response - 500

## Accounts..

_POST_ `/accounts/`

- Create a user account

Request Body

```
{
    name: <prefered_name>
}
```

Response - 201

Response - 500

## Voting..

_POST_ `/votes/`

- Cast a vote.

Request Body

```
{
    mbti: <mbti_choice>,
    enneagram: <enneagram_choice>,
    zodiac: <zodiac_choice>,
    profile: <id_profile_we_are_voting>,
    user: <from_auth_system_the_id>
}
```

Response - 201

Response - 500

## Commenting...

_POST_ `/comments/`

- Post a comment.

Request Body

```
{
    comment: <comment>,
    title: <title_of_comment>,
    profile: <id_profile_we_are_commenting>,
    user: <from_auth_system_the_id>
}
```

Response - 201

Response - 500

_GET_ `/comments/:profileId`

- Comments on a profile

Response - 200

```
{
    [Comments]
}
```

Response - 500

_GET_ `/comments/:profileId/:personality`

- Comments by personality

Response - 200

```
{
    [Comments]
}
```

Response - 500

_GET_ `/comments/:profileId/sort`

- Sort comments by recent/ no-of-likes

Response - 200

```
{
    [Comments]
}
```

Response - 500

_GET_ `comments/:commentId/like`

- Like Comment

Response - 200

Response - 500

_GET_ `comments/:commentId/unlike`

- Like Comment

Response - 200

Response - 500
