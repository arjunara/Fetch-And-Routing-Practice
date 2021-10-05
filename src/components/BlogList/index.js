// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import BlogItem from '../BlogItem'

import './index.css'

class BlogList extends Component {
  state = {blogsList: [], isLoading: true}

  componentDidMount() {
    this.getApiData()
  }

  getApiData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(each => ({
      id: each.id,
      title: each.title,
      imageUrl: each.image_url,
      avatarUrl: each.avatar_url,
      author: each.author,
      topic: each.topic,
    }))
    this.setState({blogsList: updatedData, isLoading: false})
  }

  renderBlogsListPage = () => {
    const {blogsList} = this.state
    return (
      <ul className="blogs-list-container">
        {blogsList.map(eachBlog => (
          <BlogItem blogDetails={eachBlog} key={eachBlog.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="blogs-list-bg-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          this.renderBlogsListPage()
        )}
      </div>
    )
  }
}

export default BlogList
