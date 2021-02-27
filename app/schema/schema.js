const graphql = require("graphql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

const ObjectId = id => {
  return new mongoose.Types.ObjectId(id);
};

const Artwork = require("../models/artwork.js");
const Blog = require("../models/blog.js");
const Category = require("../models/category.js");
const Creator = require("../models/creator.js");
const Slide = require("../models/slide.js");
const Song = require("../models/song.js");
const Member = require("../models/member.js");
const Testimonial = require("../models/testimonial.js");
const Vlog = require("../models/vlog.js");
const Feedback = require("../models/feedback.js");

const Home = require("../models/home.js");
const Footer = require("../models/footer.js");
const Contact = require("../models/contact.js");
const About = require("../models/about.js");
const Social = require("../models/social.js");

const User = require("../models/user.js");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLError,
  GraphQLBoolean
} = graphql;

const TokenType = new GraphQLObjectType({
  name: "Token",
  fields: () => ({
    value: { type: GraphQLBoolean },
    message: { type: GraphQLString }
  })
});

const HomeType = new GraphQLObjectType({
  name: "Home",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    websiteName: { type: GraphQLString },
    tagline: { type: GraphQLString },
    logo: { type: GraphQLString },
    background: { type: GraphQLString },
    video: { type: GraphQLString },
    summary: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

const FooterType = new GraphQLObjectType({
  name: "Footer",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    copyName: { type: GraphQLString },
    copyYear: { type: GraphQLString },
    privacy: { type: GraphQLString },
    terms: { type: GraphQLString },
    disclaimer: { type: GraphQLString }
  })
});

const AboutType = new GraphQLObjectType({
  name: "About",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    heading: { type: GraphQLString },
    yourName: { type: GraphQLString },
    brandName: { type: GraphQLString },
    yourPhoto: { type: GraphQLString },
    brandPhoto: { type: GraphQLString },
    yourVideo: { type: GraphQLString },
    brandVideo: { type: GraphQLString },
    yourInfo: { type: GraphQLString },
    brandInfo: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

const ContactType = new GraphQLObjectType({
  name: "Contact",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    heading: { type: GraphQLString },
    info: { type: GraphQLString },
    primaryEmail: { type: GraphQLString },
    secondaryEmail: { type: GraphQLString },
    tertiaryEmail: { type: GraphQLString },
    primaryPhone: { type: GraphQLString },
    secondaryPhone: { type: GraphQLString },
    tertiaryPhone: { type: GraphQLString },
    name: { type: GraphQLString },
    flat: { type: GraphQLString },
    area: { type: GraphQLString },
    landmark: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    pin: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

const SocialType = new GraphQLObjectType({
  name: "Social",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    facebook: { type: GraphQLString },
    instagram: { type: GraphQLString },
    twitter: { type: GraphQLString },
    linkedin: { type: GraphQLString },
    pinterest: { type: GraphQLString },
    youtube: { type: GraphQLString },
    whatsapp: { type: GraphQLString },
    tumblr: { type: GraphQLString },
    quora: { type: GraphQLString },
    medium: { type: GraphQLString },
    github: { type: GraphQLString },
    codepen: { type: GraphQLString },
    behance: { type: GraphQLString },
    dribbble: { type: GraphQLString },
    yourQuote: { type: GraphQLString }
  })
});

const FeedbackType = new GraphQLObjectType({
  name: "Feedback",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    message: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    website: { type: GraphQLString },
    date: { type: GraphQLString }
  })
});

const SlideType = new GraphQLObjectType({
  name: "Slide",
  fields: () => ({
    id: { type: GraphQLID },
    caption: { type: GraphQLString },
    photo: { type: GraphQLString }
  })
});

const MemberType = new GraphQLObjectType({
  name: "Member",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    designation: { type: GraphQLString },
    photo: { type: GraphQLString },
    video: { type: GraphQLString },
    summary: { type: GraphQLString },
    link: { type: GraphQLString }
  })
});

const TestimonialType = new GraphQLObjectType({
  name: "Testimonial",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    designation: { type: GraphQLString },
    photo: { type: GraphQLString },
    video: { type: GraphQLString },
    summary: { type: GraphQLString },
    link: { type: GraphQLString }
  })
});

const BlogType = new GraphQLObjectType({
  name: "Blog",
  fields: () => ({
    id: { type: GraphQLID },
    permalink: { type: GraphQLString },
    title: { type: GraphQLString },
    coverPhoto: { type: GraphQLString },
    video: { type: GraphQLString },
    summary: { type: GraphQLString },
    date: { type: GraphQLString },
    post: { type: GraphQLString },

    tags: { type: new GraphQLList(GraphQLString) },

    creator: {
      type: CreatorType,

      resolve(parent, args) {
        try {
          ObjectId(parent.creatorId);
        } catch (e) {
          return null;
        }

        return Creator.findById(parent.creatorId);
      }
    },

    category: {
      type: CategoryType,

      resolve(parent, args) {
        try {
          ObjectId(parent.categoryId);
        } catch (e) {
          return null;
        }

        return Category.findById(parent.categoryId);
      }
    }
  })
});

const ArtworkType = new GraphQLObjectType({
  name: "Artwork",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    photo: { type: GraphQLString },
    summary: { type: GraphQLString },
    credits: { type: GraphQLString },

    tags: { type: new GraphQLList(GraphQLString) },

    creator: {
      type: CreatorType,

      resolve(parent, args) {
        try {
          ObjectId(parent.creatorId);
        } catch (e) {
          return null;
        }

        return Creator.findById(parent.creatorId);
      }
    },

    category: {
      type: CategoryType,

      resolve(parent, args) {
        try {
          ObjectId(parent.categoryId);
        } catch (e) {
          return null;
        }

        return Category.findById(parent.categoryId);
      }
    }
  })
});

const VlogType = new GraphQLObjectType({
  name: "Vlog",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    coverPhoto: { type: GraphQLString },
    video: { type: GraphQLString },
    summary: { type: GraphQLString },
    credits: { type: GraphQLString },

    tags: { type: new GraphQLList(GraphQLString) },

    creator: {
      type: CreatorType,

      resolve(parent, args) {
        try {
          ObjectId(parent.creatorId);
        } catch (e) {
          return null;
        }

        return Creator.findById(parent.creatorId);
      }
    },

    category: {
      type: CategoryType,

      resolve(parent, args) {
        try {
          ObjectId(parent.categoryId);
        } catch (e) {
          return null;
        }

        return Category.findById(parent.categoryId);
      }
    }
  })
});

const SongType = new GraphQLObjectType({
  name: "Song",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    coverPhoto: { type: GraphQLString },
    song: { type: GraphQLString },
    summary: { type: GraphQLString },
    credits: { type: GraphQLString },

    tags: { type: new GraphQLList(GraphQLString) },

    creator: {
      type: CreatorType,

      resolve(parent, args) {
        try {
          ObjectId(parent.creatorId);
        } catch (e) {
          return null;
        }

        return Creator.findById(parent.creatorId);
      }
    },

    category: {
      type: CategoryType,

      resolve(parent, args) {
        try {
          ObjectId(parent.categoryId);
        } catch (e) {
          return null;
        }

        return Category.findById(parent.categoryId);
      }
    }
  })
});

const CreatorType = new GraphQLObjectType({
  name: "Creator",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    designation: { type: GraphQLString },
    photo: { type: GraphQLString },
    video: { type: GraphQLString },
    summary: { type: GraphQLString },
    link: { type: GraphQLString },

    blogs: {
      type: new GraphQLList(BlogType),
      args: {
        search: { type: GraphQLString },
        tag: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (args.search !== undefined && args.tag !== undefined)
          throw new GraphQLError(
            "You must not provide both `search` and `tag` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Blog.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  creatorId: parent.id,
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Blog.find(
              { $text: { $search: args.search }, creatorId: parent.id }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Blog.find({
            _id: { [dt]: ObjectId(args.cursor) },
            creatorId: parent.id
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        if (args.tag !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return Blog.find({
              _id: { [dt]: ObjectId(args.cursor) },
              creatorId: parent.id,
              tags: args.tag
            })
              .sort({ $natural: sign })
              .limit(pos);
          }

          return Blog.find({ tags: args.tag, creatorId: parent.id })
            .sort({ $natural: sign })
            .skip(miss)
            .limit(pos);
        }

        return Blog.find({ creatorId: parent.id })
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    artworks: {
      type: new GraphQLList(ArtworkType),
      args: {
        search: { type: GraphQLString },
        tag: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (args.search !== undefined && args.tag !== undefined)
          throw new GraphQLError(
            "You must not provide both `search` and `tag` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Artwork.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  creatorId: parent.id,
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Artwork.find(
              { $text: { $search: args.search }, creatorId: parent.id }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Artwork.find({
            _id: { [dt]: ObjectId(args.cursor) },
            creatorId: parent.id
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        if (args.tag !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return Artwork.find({
              _id: { [dt]: ObjectId(args.cursor) },
              creatorId: parent.id,
              tags: args.tag
            })
              .sort({ $natural: sign })
              .limit(pos);
          }

          return Artwork.find({ tags: args.tag, creatorId: parent.id })
            .sort({ $natural: sign })
            .skip(miss)
            .limit(pos);
        }

        return Artwork.find({ creatorId: parent.id })
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    vlogs: {
      type: new GraphQLList(VlogType),
      args: {
        search: { type: GraphQLString },
        tag: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (args.search !== undefined && args.tag !== undefined)
          throw new GraphQLError(
            "You must not provide both `search` and `tag` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Vlog.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  creatorId: parent.id,
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Vlog.find(
              { $text: { $search: args.search }, creatorId: parent.id }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Vlog.find({
            _id: { [dt]: ObjectId(args.cursor) },
            creatorId: parent.id
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        if (args.tag !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return Vlog.find({
              _id: { [dt]: ObjectId(args.cursor) },
              creatorId: parent.id,
              tags: args.tag
            })
              .sort({ $natural: sign })
              .limit(pos);
          }

          return Vlog.find({ tags: args.tag, creatorId: parent.id })
            .sort({ $natural: sign })
            .skip(miss)
            .limit(pos);
        }

        return Vlog.find({ creatorId: parent.id })
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    songs: {
      type: new GraphQLList(SongType),
      args: {
        search: { type: GraphQLString },
        tag: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (args.search !== undefined && args.tag !== undefined)
          throw new GraphQLError(
            "You must not provide both `search` and `tag` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Song.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  creatorId: parent.id,
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Song.find(
              { $text: { $search: args.search }, creatorId: parent.id }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Song.find({
            _id: { [dt]: ObjectId(args.cursor) },
            creatorId: parent.id
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        if (args.tag !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return Song.find({
              _id: { [dt]: ObjectId(args.cursor) },
              creatorId: parent.id,
              tags: args.tag
            })
              .sort({ $natural: sign })
              .limit(pos);
          }

          return Song.find({ tags: args.tag, creatorId: parent.id })
            .sort({ $natural: sign })
            .skip(miss)
            .limit(pos);
        }

        return Song.find({ creatorId: parent.id })
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    }
  })
});

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    photo: { type: GraphQLString },
    video: { type: GraphQLString },
    summary: { type: GraphQLString },
    link: { type: GraphQLString },

    blogs: {
      type: new GraphQLList(BlogType),
      args: {
        search: { type: GraphQLString },
        tag: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (args.search !== undefined && args.tag !== undefined)
          throw new GraphQLError(
            "You must not provide both `search` and `tag` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Blog.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  categoryId: parent.id,
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Blog.find(
              { $text: { $search: args.search }, categoryId: parent.id }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Blog.find({
            _id: { [dt]: ObjectId(args.cursor) },
            categoryId: parent.id
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        if (args.tag !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return Blog.find({
              _id: { [dt]: ObjectId(args.cursor) },
              categoryId: parent.id,
              tags: args.tag
            })
              .sort({ $natural: sign })
              .limit(pos);
          }

          return Blog.find({ tags: args.tag, categoryId: parent.id })
            .sort({ $natural: sign })
            .skip(miss)
            .limit(pos);
        }

        return Blog.find({ categoryId: parent.id })
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    artworks: {
      type: new GraphQLList(ArtworkType),
      args: {
        search: { type: GraphQLString },
        tag: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (args.search !== undefined && args.tag !== undefined)
          throw new GraphQLError(
            "You must not provide both `search` and `tag` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Artwork.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  categoryId: parent.id,
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Artwork.find(
              { $text: { $search: args.search }, categoryId: parent.id }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Artwork.find({
            _id: { [dt]: ObjectId(args.cursor) },
            categoryId: parent.id
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        if (args.tag !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return Artwork.find({
              _id: { [dt]: ObjectId(args.cursor) },
              categoryId: parent.id,
              tags: args.tag
            })
              .sort({ $natural: sign })
              .limit(pos);
          }

          return Artwork.find({ tags: args.tag, categoryId: parent.id })
            .sort({ $natural: sign })
            .skip(miss)
            .limit(pos);
        }

        return Artwork.find({ categoryId: parent.id })
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    vlogs: {
      type: new GraphQLList(VlogType),
      args: {
        search: { type: GraphQLString },
        tag: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (args.search !== undefined && args.tag !== undefined)
          throw new GraphQLError(
            "You must not provide both `search` and `tag` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Vlog.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  categoryId: parent.id,
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Vlog.find(
              { $text: { $search: args.search }, categoryId: parent.id }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Vlog.find({
            _id: { [dt]: ObjectId(args.cursor) },
            categoryId: parent.id
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        if (args.tag !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return Vlog.find({
              _id: { [dt]: ObjectId(args.cursor) },
              categoryId: parent.id,
              tags: args.tag
            })
              .sort({ $natural: sign })
              .limit(pos);
          }

          return Vlog.find({ tags: args.tag, categoryId: parent.id })
            .sort({ $natural: sign })
            .skip(miss)
            .limit(pos);
        }

        return Vlog.find({ categoryId: parent.id })
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    songs: {
      type: new GraphQLList(VlogType),
      args: {
        search: { type: GraphQLString },
        tag: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (args.search !== undefined && args.tag !== undefined)
          throw new GraphQLError(
            "You must not provide both `search` and `tag` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Song.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  categoryId: parent.id,
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Song.find(
              { $text: { $search: args.search }, categoryId: parent.id }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Song.find({
            _id: { [dt]: ObjectId(args.cursor) },
            categoryId: parent.id
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        if (args.tag !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return Song.find({
              _id: { [dt]: ObjectId(args.cursor) },
              categoryId: parent.id,
              tags: args.tag
            })
              .sort({ $natural: sign })
              .limit(pos);
          }

          return Song.find({ tags: args.tag, categoryId: parent.id })
            .sort({ $natural: sign })
            .skip(miss)
            .limit(pos);
        }

        return Song.find({ categoryId: parent.id })
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    login: {
      type: TokenType,

      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },

      async resolve(parent, args, context) {
        /*
        const prevUser = context.email;
        
        
        if (prevUser) {
          throw new GraphQLError("Boy, you are already logged in!");
          return;
        }
        */

        let user = await User.findOne({
          email: args.email
        });

        if (!user) {
          return { value: false, message: "Email not found." };
        }

        if (bcrypt.compareSync(args.password, user.password)) {
          let token = jwt.sign({ email: args.email }, process.env.JWT, {
            algorithm: "HS256",
            expiresIn: "1y"
          });

          context.res.cookie("leanaToken", token, {
            httpOnly: true,
            sameSite: "strict",
            domain: ".leana.gq",
            secure: true,
            maxAge: 365 * 24 * 60 * 60 * 1000
          });

          // console.log(context.res);

          return { value: true };
        } else {
          return { value: false, message: "Incorrect password." };
        }
      }
    },

    logout: {
      type: TokenType,

      resolve(parent, args, context) {
        // context.res.clearCookie("leanaToken");
      
        context.res.cookie("leanaToken", 0, {
          httpOnly: true,
          sameSite: "strict",
          domain: ".leana.gq",
          secure: true,
          maxAge: 0
        });
        
        // console.log(context.res);

        return { value: true };
      }
    },

    updateHome: {
      type: HomeType,

      args: {
        websiteName: { type: new GraphQLNonNull(GraphQLString) },
        tagline: { type: GraphQLString },
        logo: { type: GraphQLString },
        background: { type: GraphQLString },
        video: { type: GraphQLString },
        summary: { type: GraphQLString },
        description: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Home.findOneAndUpdate(
          { type: "Home" }, // Query parameter
          {
            // Replacement document
            websiteName: args.websiteName,
            tagline: args.tagline,
            logo: args.logo,
            video: args.video,
            background: args.background,
            summary: args.summary,
            description: args.description
          },
          { upsert: true }
        );
      }
    },

    updateFooter: {
      type: FooterType,

      args: {
        copyName: { type: GraphQLString },
        copyYear: { type: GraphQLString },
        privacy: { type: GraphQLString },
        terms: { type: GraphQLString },
        disclaimer: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Footer.findOneAndUpdate(
          { type: "Footer" }, // Query parameter
          {
            // Replacement document
            copyName: args.copyName,
            copyYear: args.copyYear,
            privacy: args.privacy,
            terms: args.terms,
            disclaimer: args.disclaimer
          },
          { upsert: true }
        );
      }
    },

    updateAbout: {
      type: AboutType,

      args: {
        heading: { type: GraphQLString },
        yourName: { type: GraphQLString },
        brandName: { type: GraphQLString },
        yourPhoto: { type: GraphQLString },
        brandPhoto: { type: GraphQLString },
        yourVideo: { type: GraphQLString },
        brandVideo: { type: GraphQLString },
        yourInfo: { type: GraphQLString },
        brandInfo: { type: GraphQLString },
        description: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return About.findOneAndUpdate(
          { type: "About" }, // Query parameter
          {
            // Replacement document
            heading: args.heading,
            yourName: args.yourName,
            brandName: args.brandName,
            yourPhoto: args.yourPhoto,
            brandPhoto: args.brandPhoto,
            yourVideo: args.yourVideo,
            brandVideo: args.brandVideo,
            yourInfo: args.yourInfo,
            brandInfo: args.brandInfo,
            description: args.description
          },
          { upsert: true }
        );
      }
    },

    updateContact: {
      type: ContactType,

      args: {
        heading: { type: GraphQLString },
        info: { type: GraphQLString },
        primaryEmail: { type: GraphQLString },
        secondaryEmail: { type: GraphQLString },
        tertiaryEmail: { type: GraphQLString },
        primaryPhone: { type: GraphQLString },
        secondaryPhone: { type: GraphQLString },
        tertiaryPhone: { type: GraphQLString },
        name: { type: GraphQLString },
        flat: { type: GraphQLString },
        area: { type: GraphQLString },
        landmark: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        pin: { type: GraphQLString },
        description: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Contact.findOneAndUpdate(
          { type: "Contact" }, // Query parameter
          {
            // Replacement document
            heading: args.heading,
            info: args.info,
            primaryEmail: args.primaryEmail,
            secondaryEmail: args.secondaryEmail,
            tertiaryEmail: args.tertiaryEmail,
            primaryPhone: args.primaryPhone,
            secondaryPhone: args.secondaryPhone,
            tertiaryPhone: args.tertiaryPhone,
            name: args.name,
            flat: args.flat,
            area: args.area,
            landmark: args.landmark,
            city: args.city,
            state: args.state,
            pin: args.pin,
            description: args.description
          },
          { upsert: true }
        );
      }
    },

    updateSocial: {
      type: SocialType,

      args: {
        facebook: { type: GraphQLString },
        instagram: { type: GraphQLString },
        twitter: { type: GraphQLString },
        linkedin: { type: GraphQLString },
        pinterest: { type: GraphQLString },
        youtube: { type: GraphQLString },
        whatsapp: { type: GraphQLString },
        tumblr: { type: GraphQLString },
        quora: { type: GraphQLString },
        medium: { type: GraphQLString },
        github: { type: GraphQLString },
        codepen: { type: GraphQLString },
        behance: { type: GraphQLString },
        dribbble: { type: GraphQLString },
        yourQuote: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Social.findOneAndUpdate(
          { type: "Social" }, // Query parameter
          {
            // Replacement document
            facebook: args.facebook,
            instagram: args.instagram,
            twitter: args.twitter,
            linkedin: args.linkedin,
            pinterest: args.pinterest,
            youtube: args.youtube,
            whatsapp: args.whatsapp,
            tumblr: args.tumblr,
            quora: args.quora,
            medium: args.medium,
            github: args.github,
            codepen: args.codepen,
            behance: args.behance,
            dribbble: args.dribbble,
            yourQuote: args.yourQuote
          },
          { upsert: true }
        );
      }
    },

    addFeedback: {
      type: FeedbackType,

      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        website: { type: GraphQLString },
        date: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Feedback.create({
          name: args.name || null,
          message: args.message || null,
          email: args.email || null,
          phone: args.phone || null,
          website: args.website || null,
          date: args.date || null
        });
      }
    },

    deleteFeedback: {
      type: FeedbackType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Feedback.findOneAndDelete({ _id: args.id });
      }
    },

    updateFeedback: {
      type: FeedbackType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        website: { type: GraphQLString },
        date: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Feedback.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            name: args.name,
            message: args.message,
            email: args.email,
            phone: args.phone,
            website: args.website,
            date: args.date
          },
          { new: true }
        );
      }
    },

    addSlide: {
      type: SlideType,

      args: {
        caption: { type: new GraphQLNonNull(GraphQLString) },
        photo: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Slide.create({
          caption: args.caption || null,
          photo: args.photo || null
        });
      }
    },

    deleteSlide: {
      type: SlideType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Slide.findOneAndDelete({ _id: args.id });
      }
    },

    updateSlide: {
      type: SlideType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        caption: { type: new GraphQLNonNull(GraphQLString) },
        photo: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Slide.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            caption: args.caption,
            photo: args.photo
          },
          { new: true }
        );
      }
    },

    addMember: {
      type: MemberType,

      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        designation: { type: GraphQLString },
        photo: { type: GraphQLString },
        video: { type: GraphQLString },
        summary: { type: GraphQLString },
        link: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Member.create({
          name: args.name || null,
          designation: args.designation || null,
          photo: args.photo || null,
          video: args.video || null,
          summary: args.summary || null,
          link: args.link || null
        });
      }
    },

    deleteMember: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Member.findOneAndDelete({ _id: args.id });
      }
    },

    updateMember: {
      type: MemberType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        designation: { type: GraphQLString },
        photo: { type: GraphQLString },
        video: { type: GraphQLString },
        summary: { type: GraphQLString },
        link: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Member.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            name: args.name,
            designation: args.designation,
            photo: args.photo,
            video: args.video,
            summary: args.summary,
            link: args.link
          },
          { new: true }
        );
      }
    },

    addTestimonial: {
      type: TestimonialType,

      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        designation: { type: GraphQLString },
        photo: { type: GraphQLString },
        video: { type: GraphQLString },
        summary: { type: GraphQLString },
        link: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Testimonial.create({
          name: args.name || null,
          designation: args.designation || null,
          photo: args.photo || null,
          video: args.video || null,
          summary: args.summary || null,
          link: args.link || null
        });
      }
    },

    deleteTestimonial: {
      type: TestimonialType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Testimonial.findOneAndDelete({ _id: args.id });
      }
    },

    updateTestimonial: {
      type: TestimonialType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        designation: { type: GraphQLString },
        photo: { type: GraphQLString },
        video: { type: GraphQLString },
        summary: { type: GraphQLString },
        link: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Testimonial.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            name: args.name,
            designation: args.designation,
            photo: args.photo,
            video: args.video,
            summary: args.summary,
            link: args.link
          },
          { new: true }
        );
      }
    },

    addCreator: {
      type: CreatorType,

      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        designation: { type: GraphQLString },
        photo: { type: GraphQLString },
        video: { type: GraphQLString },
        summary: { type: GraphQLString },
        link: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Creator.create({
          name: args.name || null,
          designation: args.designation || null,
          photo: args.photo || null,
          video: args.video || null,
          summary: args.summary || null,
          link: args.link || null
        });
      }
    },

    deleteCreator: {
      type: CreatorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Creator.findOneAndDelete({ _id: args.id });
      }
    },

    updateCreator: {
      type: CreatorType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        designation: { type: GraphQLString },
        photo: { type: GraphQLString },
        video: { type: GraphQLString },
        summary: { type: GraphQLString },
        link: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Creator.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            name: args.name,
            designation: args.designation,
            photo: args.photo,
            video: args.video,
            summary: args.summary,
            link: args.link
          },
          { new: true }
        );
      }
    },

    addCategory: {
      type: CategoryType,

      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        photo: { type: GraphQLString },
        video: { type: GraphQLString },
        summary: { type: GraphQLString },
        link: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Category.create({
          name: args.name || null,
          photo: args.photo || null,
          video: args.video || null,
          summary: args.summary || null,
          link: args.link || null
        });
      }
    },

    deleteCategory: {
      type: CategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Category.findOneAndDelete({ _id: args.id });
      }
    },

    updateCategory: {
      type: CategoryType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        photo: { type: GraphQLString },
        video: { type: GraphQLString },
        summary: { type: GraphQLString },
        link: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Category.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            name: args.name,
            photo: args.photo,
            video: args.video,
            summary: args.summary,
            link: args.link
          },
          { new: true }
        );
      }
    },

    addBlog: {
      type: BlogType,

      args: {
        permalink: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        coverPhoto: { type: GraphQLString },
        video: { type: GraphQLString },
        date: { type: GraphQLString },
        summary: { type: GraphQLString },
        post: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        creatorId: { type: GraphQLString },
        categoryId: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Blog.create({
          permalink: args.permalink || null,
          title: args.title || null,
          coverPhoto: args.coverPhoto || null,
          video: args.video || null,
          date: args.date || null,
          summary: args.summary || null,
          post: args.post || null,
          tags: args.tags || null,
          creatorId: args.creatorId || null,
          categoryId: args.categoryId || null
        });
      }
    },

    deleteBlog: {
      type: BlogType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Blog.findOneAndDelete({ _id: args.id });
      }
    },

    updateBlog: {
      type: BlogType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        permalink: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        coverPhoto: { type: GraphQLString },
        video: { type: GraphQLString },
        date: { type: GraphQLString },
        summary: { type: GraphQLString },
        post: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        creatorId: { type: GraphQLString },
        categoryId: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Blog.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            permalink: args.permalink,
            title: args.title,
            coverPhoto: args.coverPhoto,
            video: args.video,
            date: args.date,
            summary: args.summary,
            post: args.post,
            tags: args.tags,
            creatorId: args.creatorId,
            categoryId: args.categoryId
          },
          { new: true }
        );
      }
    },

    addArtwork: {
      type: ArtworkType,

      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        photo: { type: GraphQLString },
        credits: { type: GraphQLString },
        summary: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        creatorId: { type: GraphQLString },
        categoryId: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Artwork.create({
          title: args.title || null,
          photo: args.photo || null,
          credits: args.credits || null,
          summary: args.summary || null,
          tags: args.tags || null,
          creatorId: args.creatorId || null,
          categoryId: args.categoryId || null
        });
      }
    },

    deleteArtwork: {
      type: ArtworkType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Artwork.findOneAndDelete({ _id: args.id });
      }
    },

    updateArtwork: {
      type: ArtworkType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        photo: { type: GraphQLString },
        credits: { type: GraphQLString },
        summary: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        creatorId: { type: GraphQLString },
        categoryId: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Artwork.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            title: args.title,
            photo: args.photo,
            credits: args.credits,
            summary: args.summary,
            tags: args.tags,
            creatorId: args.creatorId,
            categoryId: args.categoryId
          },
          { new: true }
        );
      }
    },

    addVlog: {
      type: VlogType,

      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        coverPhoto: { type: GraphQLString },
        video: { type: GraphQLString },
        credits: { type: GraphQLString },
        summary: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        creatorId: { type: GraphQLString },
        categoryId: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Vlog.create({
          title: args.title || null,
          coverPhoto: args.coverPhoto || null,
          video: args.video || null,
          credits: args.credits || null,
          summary: args.summary || null,
          tags: args.tags || null,
          creatorId: args.creatorId || null,
          categoryId: args.categoryId || null
        });
      }
    },

    deleteVlog: {
      type: VlogType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Vlog.findOneAndDelete({ _id: args.id });
      }
    },

    updateVlog: {
      type: VlogType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        coverPhoto: { type: GraphQLString },
        video: { type: GraphQLString },
        credits: { type: GraphQLString },
        summary: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        creatorId: { type: GraphQLString },
        categoryId: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Vlog.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            title: args.title,
            coverPhoto: args.coverPhoto,
            video: args.video,
            credits: args.credits,
            summary: args.summary,
            tags: args.tags,
            creatorId: args.creatorId,
            categoryId: args.categoryId
          },
          { new: true }
        );
      }
    },

    addSong: {
      type: SongType,

      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        coverPhoto: { type: GraphQLString },
        song: { type: GraphQLString },
        credits: { type: GraphQLString },
        summary: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        creatorId: { type: GraphQLString },
        categoryId: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Song.create({
          title: args.title || null,
          coverPhoto: args.coverPhoto || null,
          song: args.song || null,
          credits: args.credits || null,
          summary: args.summary || null,
          tags: args.tags || null,
          creatorId: args.creatorId || null,
          categoryId: args.categoryId || null
        });
      }
    },

    deleteSong: {
      type: SongType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Song.findOneAndDelete({ _id: args.id });
      }
    },

    updateSong: {
      type: SongType,

      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        coverPhoto: { type: GraphQLString },
        song: { type: GraphQLString },
        credits: { type: GraphQLString },
        summary: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        creatorId: { type: GraphQLString },
        categoryId: { type: GraphQLString }
      },

      resolve(parent, args, context) {
        if (context.email !== process.env.ME) {
          throw new GraphQLError("You ain't me, kid!");
          return;
        }

        return Song.findOneAndUpdate(
          { _id: args.id }, // Query parameter
          {
            // Replacement document
            title: args.title,
            coverPhoto: args.coverPhoto,
            song: args.song,
            credits: args.credits,
            summary: args.summary,
            tags: args.tags,
            creatorId: args.creatorId,
            categoryId: args.categoryId
          },
          { new: true }
        );
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    home: {
      type: HomeType,
      resolve(parent, args) {
        return Home.findOne({ type: "Home" });
      }
    },

    footer: {
      type: FooterType,
      resolve(parent, args) {
        return Footer.findOne({ type: "Footer" });
      }
    },

    about: {
      type: AboutType,
      resolve(parent, args) {
        return About.findOne({ type: "About" });
      }
    },

    contact: {
      type: ContactType,
      resolve(parent, args) {
        return Contact.findOne({ type: "Contact" });
      }
    },

    social: {
      type: SocialType,
      resolve(parent, args) {
        return Social.findOne({ type: "Social" });
      }
    },

    feedback: {
      type: FeedbackType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }
        return Feedback.findById(args.id);
      }
    },

    feedbacks: {
      type: new GraphQLList(FeedbackType),
      args: {
        search: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Feedback.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Feedback.find(
              { $text: { $search: args.search } }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Feedback.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return Feedback.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    slide: {
      type: SlideType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }
        return Slide.findById(args.id);
      }
    },

    slides: {
      type: new GraphQLList(SlideType),
      args: {
        search: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Slide.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Slide.find(
              { $text: { $search: args.search } }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Slide.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return Slide.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    member: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }
        return Member.findById(args.id);
      }
    },

    members: {
      type: new GraphQLList(MemberType),
      args: {
        search: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Member.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Member.find(
              { $text: { $search: args.search } }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Member.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return Member.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    testimonial: {
      type: TestimonialType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }
        return Testimonial.findById(args.id);
      }
    },

    testimonials: {
      type: new GraphQLList(TestimonialType),
      args: {
        search: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Testimonial.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Testimonial.find(
              { $text: { $search: args.search } }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Testimonial.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return Testimonial.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    blog: {
      type: BlogType,
      args: {
        id: { type: GraphQLID },
        permalink: { type: GraphQLID }
      },

      resolve(parent, args) {
        if (
          (args.id !== undefined && args.permalink !== undefined) ||
          (args.id === undefined && args.permalink === undefined)
        )
          throw new GraphQLError(
            "You must provide either an `id` or a `permalink` value"
          );

        if (args.id !== undefined) {
          try {
            ObjectId(args.id);
          } catch (e) {
            return null;
          }

          return Blog.findById(args.id);
        }

        if (args.permalink !== undefined)
          return Blog.findOne({ permalink: args.permalink });
      }
    },

    artwork: {
      type: ArtworkType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }
        return Artwork.findById(args.id);
      }
    },

    vlog: {
      type: VlogType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }
        return Vlog.findById(args.id);
      }
    },

    song: {
      type: SongType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }
        return Song.findById(args.id);
      }
    },

    creator: {
      type: CreatorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }
        return Creator.findById(args.id);
      }
    },

    category: {
      type: CategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },

      resolve(parent, args) {
        try {
          ObjectId(args.id);
        } catch (e) {
          return null;
        }
        return Category.findById(args.id);
      }
    },

    blogs: {
      type: new GraphQLList(BlogType),
      args: {
        search: { type: GraphQLString },
        tag: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (args.search !== undefined && args.tag !== undefined)
          throw new GraphQLError(
            "You must not provide both `search` and `tag` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Blog.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Blog.find(
              { $text: { $search: args.search } }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.tag !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return Blog.find({
              _id: { [dt]: ObjectId(args.cursor) },
              tags: args.tag
            })
              .sort({ $natural: sign })
              .limit(pos);
          }

          return Blog.find({ tags: args.tag })
            .sort({ $natural: sign })
            .skip(miss)
            .limit(pos);
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Blog.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return Blog.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    artworks: {
      type: new GraphQLList(ArtworkType),
      args: {
        search: { type: GraphQLString },
        tag: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (args.search !== undefined && args.tag !== undefined)
          throw new GraphQLError(
            "You must not provide both `search` and `tag` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Artwork.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Artwork.find(
              { $text: { $search: args.search } }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.tag !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return Artwork.find({
              _id: { [dt]: ObjectId(args.cursor) },
              tags: args.tag
            })
              .sort({ $natural: sign })
              .limit(pos);
          }

          return Artwork.find({ tags: args.tag })
            .sort({ $natural: sign })
            .skip(miss)
            .limit(pos);
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Artwork.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return Artwork.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    vlogs: {
      type: new GraphQLList(VlogType),
      args: {
        search: { type: GraphQLString },
        tag: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (args.search !== undefined && args.tag !== undefined)
          throw new GraphQLError(
            "You must not provide both `search` and `tag` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Vlog.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Vlog.find(
              { $text: { $search: args.search } }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.tag !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return Vlog.find({
              _id: { [dt]: ObjectId(args.cursor) },
              tags: args.tag
            })
              .sort({ $natural: sign })
              .limit(pos);
          }

          return Vlog.find({ tags: args.tag })
            .sort({ $natural: sign })
            .skip(miss)
            .limit(pos);
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Vlog.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return Vlog.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    songs: {
      type: new GraphQLList(SongType),
      args: {
        search: { type: GraphQLString },
        tag: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (args.search !== undefined && args.tag !== undefined)
          throw new GraphQLError(
            "You must not provide both `search` and `tag` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Song.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Song.find(
              { $text: { $search: args.search } }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.tag !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return Song.find({
              _id: { [dt]: ObjectId(args.cursor) },
              tags: args.tag
            })
              .sort({ $natural: sign })
              .limit(pos);
          }

          return Song.find({ tags: args.tag })
            .sort({ $natural: sign })
            .skip(miss)
            .limit(pos);
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Song.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return Song.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    creators: {
      type: new GraphQLList(CreatorType),
      args: {
        search: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Creator.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Creator.find(
              { $text: { $search: args.search } }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Creator.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return Creator.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    },

    categories: {
      type: new GraphQLList(CategoryType),
      args: {
        search: { type: GraphQLString },
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        page: { type: GraphQLInt },
        cursor: { type: GraphQLString }
      },

      resolve(parent, args) {
        if (args.first !== undefined && args.last !== undefined)
          throw new GraphQLError(
            "You must not provide both `first` and `last` values."
          );

        if (args.page !== undefined && args.cursor !== undefined)
          throw new GraphQLError(
            "You must not provide both `page` and `cursor` values."
          );

        if (
          args.first === undefined &&
          args.last === undefined &&
          (args.page !== undefined || args.cursor !== undefined)
        )
          throw new GraphQLError(
            "You must provide either a `first` or a `last` value along with page or cursor."
          );

        let sign, pos, miss, dt;

        pos = args.first || args.last;
        sign = args.last !== undefined ? -1 : 1;
        miss = (args.page - 1) * pos || 0;

        if (args.search !== undefined) {
          if (args.cursor) {
            dt = args.first !== undefined ? "$gt" : "$lt";

            return (
              Category.find(
                {
                  _id: { [dt]: ObjectId(args.cursor) },
                  $text: { $search: args.search }
                }
                // { score: { $meta: "textScore" } }
              )
                // .sort({ score: { $meta: "textScore" } })
                .sort({ _id: sign })
                .limit(pos)
            );
          }

          return (
            Category.find(
              { $text: { $search: args.search } }
              // { score: { $meta: "textScore" } }
            )
              // .sort({ score: { $meta: "textScore" } })
              .sort({ _id: sign })
              .skip(miss)
              .limit(pos)
          );
        }

        if (args.cursor) {
          dt = args.first !== undefined ? "$gt" : "$lt";

          return Category.find({
            _id: { [dt]: ObjectId(args.cursor) }
          })
            .sort({ $natural: sign })
            .limit(pos);
        }

        return Category.find({})
          .sort({ $natural: sign })
          .skip(miss)
          .limit(pos);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
