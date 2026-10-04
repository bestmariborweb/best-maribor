import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, Briefcase, Globe, Calendar, Award, ArrowRight, MapPin, GraduationCap, Rocket, Lightbulb, Trophy, Heart, Sparkles, Zap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { supabase } from '@/integrations/supabase/client'
import { format } from 'date-fns'
import { AnimatedHero } from '@/components/reactbits/AnimatedHero'
import { SpotlightCard } from '@/components/reactbits/SpotlightCard'
import { FlowingMenu } from '@/components/reactbits/FlowingMenu'
import { ScrollStack } from '@/components/reactbits/ScrollStack'
import { GlassSurface } from '@/components/reactbits/GlassSurface'
import GradientTextSection from '@/components/GradientTextSection'
import PartnersCarousel from '@/components/PartnersCarousel'
import EventGallery from '@/components/EventGallery'
import TeamSection from '@/components/TeamSection'
import StyledBlock from '@/components/StyledBlock'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import courseCoding from '@/assets/course-coding.jpg'
import courseEnergy from '@/assets/course-energy.jpg'
import courseRobotics from '@/assets/course-robotics.jpg'
import mariborSquare from '@/assets/maribor-square.jpg'
import MagicBento from '@/components/reactbits/MagicBento'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image: string | null
  published_at: string
}

const Home = () => {
  const { t, language } = useLanguage()
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])

  const aboutRef = useScrollReveal()
  const statsRef = useScrollReveal()

  useEffect(() => {
    fetchRecentPosts()
  }, [language])

  const fetchRecentPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, cover_image, published_at')
        .eq('is_published', true)
        .eq('language', language)
        .order('published_at', { ascending: false })
        .limit(3)

      if (error) throw error
      setRecentPosts(data || [])
    } catch (error) {
      console.error('Error fetching recent posts:', error)
    }
  }

  const eventsMenuItems = [
    {
      title: t('home.features.courses'),
      description: t('home.features.coursesDesc'),
      icon: BookOpen,
      href: '/events/courses',
      color: '#9333ea',
    },
    {
      title: t('home.features.exchange'),
      description: t('home.features.exchangeDesc'),
      icon: Globe,
      href: '/events/bse',
      color: '#0ea5e9',
    },
    {
      title: t('home.features.hackathons'),
      description: t('home.features.hackathonsDesc'),
      icon: Calendar,
      href: '/events/hackathons',
      color: '#f97316',
    },
    {
      title: t('home.features.career'),
      description: t('home.features.careerDesc'),
      icon: Briefcase,
      href: '/events/technical-days',
      color: '#ec4899',
    },
  ]

  const whyJoinItems = [
    {
      title: t('home.whyJoin.network'),
      description: t('home.whyJoin.networkDesc'),
      icon: Users,
    },
    {
      title: t('home.whyJoin.career'),
      description: t('home.whyJoin.careerDesc'),
      icon: Rocket,
    },
    {
      title: t('home.whyJoin.skills'),
      description: t('home.whyJoin.skillsDesc'),
      icon: Lightbulb,
    },
    {
      title: t('home.whyJoin.travel'),
      description: t('home.whyJoin.travelDesc'),
      icon: Globe,
    },
    {
      title: t('home.whyJoin.workshops'),
      description: t('home.whyJoin.workshopsDesc'),
      icon: Trophy,
    },
    {
      title: t('home.whyJoin.leadershipExp'),
      description: t('home.whyJoin.leadershipExpDesc'),
      icon: Award,
    },
  ]

  const whatWeDoItems = [
    {
      title: t('home.features.courses'),
      description: t('home.features.coursesDesc'),
      image: courseCoding,
    },
    {
      title: t('home.features.exchange'),
      description: t('home.features.exchangeDesc'),
      image: courseEnergy,
    },
    {
      title: t('home.features.community'),
      description: t('home.features.communityDesc'),
      image: courseRobotics,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animated Plasma Background */}
      <AnimatedHero className="flex items-center" backgroundImage="/images/hero.jpg">
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl animate-fade-in">{t('home.hero.title')}</h1>
            <p className="mb-8 text-lg md:text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/become-member">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 hover-scale">
                  {t('home.hero.cta')}
                </Button>
              </Link>
              <Link to="/about/best">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                  {t('home.hero.learnMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedHero>

      {/* About Us Section */}
      <section ref={aboutRef} className="py-16 scroll-reveal">
        <div className="container mx-auto px-4">
          <StyledBlock backgroundImage={mariborSquare}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                
                <h2 className="text-3xl mb-6 md:text-5xl px-0 font-normal text-[#af8aef]">{t('home.about.title')}</h2>
                <p className="text-lg mb-4 font-medium text-justify text-gray-100">{t('home.about.p1')}</p>
                <p className="text-lg mb-6 font-medium text-justify text-gray-100">{t('home.about.p2')}</p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/about/best">
                    <Button size="lg" className="group text-white">
                      {t('home.about.learnMore')}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/become-member">
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Join Now
                    </Button>
                  </Link>
                </div>
              </div>

              <div ref={statsRef} className="grid grid-cols-2 gap-4 scroll-reveal-scale">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold mb-1 text-white">3000+</div>
                    <div className="text-sm text-gray-400">{t('home.stats.members')}</div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-2">
                      <Globe className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="text-3xl font-bold mb-1 text-white">80+</div>
                    <div className="text-sm text-gray-400">{t('home.stats.groups')}</div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-2">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                    <div className="text-3xl font-bold mb-1 text-white">33</div>
                    <div className="text-sm text-gray-400">{t('home.stats.countries')}</div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold mb-1 text-white">35+</div>
                    <div className="text-sm text-gray-400">{t('home.stats.years')}</div>
                  </div>
                </div>
              </div>
            </div>
          </StyledBlock>
        </div>
      </section>

      {/* What We Do - Scroll Stack */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-surface-subtle to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.whatWeDo.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('home.whatWeDo.subtitle')}</p>
          </div>
          <ScrollStack items={whatWeDoItems} />
        </div>
      </section>

      {/* Gradient Text Section */}
      <GradientTextSection />

      {/* Partners Carousel */}
      <PartnersCarousel />

      {/* Event Gallery */}
      <EventGallery />

      {/* Team Section */}
      <TeamSection />

      {/* Events - Flowing Menu */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <StyledBlock variant="accent">
            <div className="text-center mb-12">
              <p className="text-primary font-medium mb-2 uppercase tracking-wider text-sm">What We Offer</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Events</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">Discover the amazing opportunities we offer</p>
            </div>
            <FlowingMenu items={eventsMenuItems} />
          </StyledBlock>
        </div>
      </section>

      {/* Recent News Section */}
      {recentPosts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.recentNews.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('home.recentNews.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {recentPosts.map((post) => (
                <Link key={post.id} to={`/news/${post.slug}`} className="group">
                  <SpotlightCard className="h-full overflow-hidden">
                    <div className="w-full h-56 overflow-hidden rounded-t-lg mb-4 bg-muted">
                      {post.cover_image ? (
                        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                          <Sparkles className="h-12 w-12 text-primary/50" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(post.published_at), 'MMM d, yyyy')}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      {post.excerpt && <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>}
                      <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        <span>{t('home.recentNews.readMore')}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link to="/news">
                <Button size="lg" variant="outline" className="group">
                  {t('home.recentNews.viewAll')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Join - Magic Bento */}
      <section className="py-20 bg-gradient-to-b from-background via-secondary/5 to-surface-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.whyJoin.title')}</h2>
            <p className="text-lg text-muted-foreground">{t('home.whyJoin.subtitle')}</p>
          </div>

          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />

          <div className="text-center">
            <Link to="/become-member">
              <Button size="lg" className="text-lg px-8">
                {t('home.whyJoin.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('home.cta.title')}</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">{t('home.cta.subtitle')}</p>
          <Link to="/become-member">
            <Button size="lg" variant="secondary" className="text-lg px-8 bg-white text-primary hover:bg-white/90">
              {t('home.cta.button')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
