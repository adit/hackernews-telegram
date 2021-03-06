import axios from 'axios';
import dayjs from 'dayjs';
import { format } from 'timeago.js';
import dedent from 'dedent';

const apiUrl = 'https://hn.algolia.com/api/v1/search?numericFilters=';

export default async function getTopPosts(username) {
  console.log('fetching posts from hacker news');

  // set headline & timestamp
  const now = dayjs().hour(0).minute(1).second(0).millisecond(0);
  let timestamp = dayjs(now).subtract(1, 'day').unix();
  let message = 'Daily';

  if (username === '@weekly_hackernews') {
    timestamp = dayjs(now).subtract(1, 'week').unix();
    message = 'Weekly';
  }

  if (username === '@monthly_hackernews') {
    timestamp = dayjs(now).subtract(1, 'month').unix();
    message = 'Monthly';
  }

  const date = dayjs(now).format('DD-MM-YYYY');

  const headline = `<strong>Hacker News ${message} Top 10 @${date}</strong>`;

  // fetch data from algolia
  const response = await axios.get(
    `${apiUrl}created_at_i>${timestamp},created_at_i<${now.unix()}`,
  );

  const result = response.data.hits
    .filter((post) => post.title != null)
    .slice(0, 10);

  let posts = result.map((post) => {
    let {
      created_at,
      title,
      url,
      author,
      points,
      num_comments,
      objectID,
    } = post;

    if (url == null) url = `https://news.ycombinator.com/item?id=${objectID}`;

    return dedent`
    👉 <a href="${url}"><strong>${title}</strong></a>
    ${points} points | by <a href="https://news.ycombinator.com/user?id=${author}">${author}</a> | ${format(
      created_at,
    )} | <a href="https://news.ycombinator.com/item?id=${objectID}">${num_comments} comments</a>`;
  });

  return [headline, ...posts].join('\n\n');
}
